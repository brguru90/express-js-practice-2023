const express=require("express")
const compression=require("compression")
const cors=require("cors")

const app=express()

// app.use(cors())
app.use((compression()))
app.use(express.json({
    limit:"50mb",    
}))

app.use((req,res,next)=>{
    console.log("global req middleware") 
    const req_time=new Date()
    res.on("finish",()=>console.log("sent response",req_time,new Date()))
    next()
})

app.use("/",express.static("./static/"))
app.use("/api",require("./router/api1"))



try {
    app.listen(8844,()=>console.log("server started"))
} catch (error) {
    console.error(error)
}

