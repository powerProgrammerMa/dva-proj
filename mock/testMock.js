module.exports={
    "GET /api/mockData":(req,res)=>{
        res.send({
            msg:"登录成功！",
            data:[
                {title:"name"}
            ]
        })
    },
   
}