const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/**
 * 登录验证函数
 * @param {*} req
 */
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const { method, path, query = {} } = req;

  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }

    const author = query.author || "";
    const keyword = query.keyword || "";
    // 最外层 return 的依旧是一个promise，由于promise内部return了值，所以其他文件调用 handleBlogRouter 方法时then里面可以获取到内部的值
    return getList(author, keyword).then((listData) => {
      return new SuccessModel(listData);
    });
  }
  // 获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }
    const id = query.id;
    if (!id) {
      return Promise.resolve(new ErrorModel("请传入id参数"));
    }
    return getDetail(id).then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  // 新建一篇博客
  if (method === "POST" && path === "api/blog/new") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }
    req.body.author = req.session.username;
    return newBlog(req.body).then((data) => {
      return new SuccessModel(data);
    });
  }
  // 更新一篇博客
  if (method === "POST" && path === "api/blog/update") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }
    const id = query.id;
    return updateBlog(id, req.body).then((data) => {
      return data ? new SuccessModel() : new ErrorModel("更新失败");
    });
  }
  // 删除一篇博客
  if (method === "POST" && path === "api/blog/delete") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }
    return deleteBlog(query.id, req.session.username).then((data) => {
      return data ? new SuccessModel() : new ErrorModel("删除失败");
    });
  }
};

module.exports = handleBlogRouter;
