export class LocalStorage {
  static getItem(key: string) {
    try {
      const result = localStorage.getItem(key);
      if (result) {
        return JSON.parse(result);
      }
    } catch (error) {}
  }

  static setItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  static updateItem(key: string, callback: (data: any) => any) {
    try {
      const result = localStorage.getItem(key);
      if (result) {
        const newResult = callback(JSON.parse(result));
        localStorage.setItem(key, JSON.stringify(newResult));
      }
    } catch (error) {}
  }

  static removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (error) {}
  }
}
