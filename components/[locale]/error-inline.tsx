export default function ErrorInline(error:any){
    return <pre className={"w-full text-wrap text-xs"}>{JSON.stringify(error)}</pre>
}