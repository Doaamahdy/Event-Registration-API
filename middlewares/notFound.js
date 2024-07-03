const notFound = (req,res)=>{
    return res.status(404).send("Route Doesn't Exist");
}
module.exports = notFound;