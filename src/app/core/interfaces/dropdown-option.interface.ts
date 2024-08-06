export interface IDropdownOption<T = any> {
    label: string;
    value: T;
    action: () => void;
    selected?: boolean;
}
  