export interface MenuInfo {
    key: string,
    title: string,
    icon?: string,
    children?: MenuInfo[],
}