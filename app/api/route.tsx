export function GET(request){
    console.log(request)
    return Response.json({message: 'You got it!'});
}

export function POST(request){
    console.log(request)
    return Response.json({message: 'You posted it!'});
}