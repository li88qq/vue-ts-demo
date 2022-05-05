export interface MenuInfo {
    id: string,
    url: string,
    title: string,
    icon?: string,
    children?: MenuInfo[],
}