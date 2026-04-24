import { generateId } from '../utils/id.js';

export interface ToastObject<Data extends object = any> {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  timeout?: number;
  priority?: 'low' | 'high';
  transitionStatus?: 'starting' | 'ending';
  onClose?: () => void;
  onRemove?: () => void;
  data?: Data;
}

export interface ToastManagerAddOptions<Data extends object = any>
  extends Omit<ToastObject<Data>, 'id' | 'transitionStatus'> {
  id?: string;
}

export type ToastManagerUpdateOptions<Data extends object = any> = Partial<
  Omit<ToastObject<Data>, 'id' | 'transitionStatus'>
>;

export interface ToastManagerPromiseOptions<Value, Data extends object = any> {
  loading: string | ToastManagerUpdateOptions<Data>;
  success:
    | string
    | ToastManagerUpdateOptions<Data>
    | ((result: Value) => string | ToastManagerUpdateOptions<Data>);
  error:
    | string
    | ToastManagerUpdateOptions<Data>
    | ((err: unknown) => string | ToastManagerUpdateOptions<Data>);
}

export interface ToastManagerEvent {
  action: 'add' | 'close' | 'update' | 'promise';
  options: any;
}

export interface ToastManager<Data extends object = any> {
  ' subscribe': (listener: (data: ToastManagerEvent) => void) => () => void;
  add<T extends Data = Data>(options: ToastManagerAddOptions<T>): string;
  close(id?: string): void;
  update<T extends Data = Data>(id: string, updates: ToastManagerUpdateOptions<T>): void;
  promise<Value, T extends Data = Data>(
    promiseValue: Promise<Value>,
    options: ToastManagerPromiseOptions<Value, T>,
  ): Promise<Value>;
}

export function createToastManager<Data extends object = any>(): ToastManager<Data> {
  const listeners = new Set<(data: ToastManagerEvent) => void>();

  function emit(data: ToastManagerEvent) {
    listeners.forEach((listener) => listener(data));
  }

  return {
    ' subscribe'(listener) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },

    add<T extends Data = Data>(options: ToastManagerAddOptions<T>): string {
      const id = options.id || generateId('toast');
      emit({ action: 'add', options: { ...options, id, transitionStatus: 'starting' } });
      return id;
    },

    close(id?: string): void {
      emit({ action: 'close', options: { id } });
    },

    update<T extends Data = Data>(id: string, updates: ToastManagerUpdateOptions<T>): void {
      emit({ action: 'update', options: { ...updates, id } });
    },

    promise<Value, T extends Data = Data>(
      promiseValue: Promise<Value>,
      options: ToastManagerPromiseOptions<Value, T>,
    ): Promise<Value> {
      const id = generateId('toast');
      const loadingOpts =
        typeof options.loading === 'string' ? { title: options.loading } : options.loading;
      emit({ action: 'add', options: { ...loadingOpts, id, transitionStatus: 'starting' } });

      promiseValue.then(
        (result) => {
          const resolved =
            typeof options.success === 'function' ? options.success(result) : options.success;
          const updateOpts = typeof resolved === 'string' ? { title: resolved } : resolved;
          emit({ action: 'update', options: { ...updateOpts, id } });
        },
        (err) => {
          const resolved =
            typeof options.error === 'function' ? options.error(err) : options.error;
          const updateOpts = typeof resolved === 'string' ? { title: resolved } : resolved;
          emit({ action: 'update', options: { ...updateOpts, id } });
        },
      );

      return promiseValue;
    },
  };
}
