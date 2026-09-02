export type Tool={slug:string;name:string;description:string;icon:string;categorySlug:string;categoryName:string;featured?:boolean;popular?:boolean;new?:boolean};
export type Category={slug:string;name:string;description:string;icon:string;order?:number};
export type Section={slug:string;label:string;description:string;icon:string;href:string;order?:number;group?:"primary"|"more"};
