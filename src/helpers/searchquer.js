const searchByQueries = (req)=>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const skip = (page - 1) * pageSize;
    const searchQuery = req.query.q || ""; 
    return {
        skip,
        pageSize,
        searchQuery,
        page
    }
}

module.exports = searchByQueries;