export type DemoDocument = {
    id : string,
    name: string,
    url: string,
    size: number,
    type: 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

export type SalesDocument = {
    name: string;
    duration: string;
    price: string;
    indexation: string;
    moreInfo: boolean;

}