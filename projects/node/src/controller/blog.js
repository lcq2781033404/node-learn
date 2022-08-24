const xss = require("xss");
const { exec } = require("../db/mysql");

/**
 * 获取博客列表
 * @param {*} author 作者
 * @param {*} keyword 关键字
 * @returns promise对象
 */
const getList = (author, keyword) => {
  // 因为 author、keyword有没有值不确定，所以拼接一个 1=1（永远成立，对查询没有任何影响） ，方便拼接where
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author like '%${author}%'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createtime desc`;
  // 返回 promise
  return exec(sql);
};
/**
 * 获取博客详情
 * @param {*} id 博客id
 * @returns promise对象
 */
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
};

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = xss(blogData.author);
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}')`;
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `update blogs set title='${title}' content='${content}' where id='${id}'`;
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  // 演示delete用法，实际工作中一般使用逻辑删除而不是物理删除
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
