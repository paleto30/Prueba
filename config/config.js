export default {
    pathName(url){
        return new URL(url).pathname;
    },
    name(url){
        return this.pathName(url).split("/").pop().replace(".js","");
    },
    uri(uri){
        return this.pathName(uri).replace(".js",".html")
    }

}