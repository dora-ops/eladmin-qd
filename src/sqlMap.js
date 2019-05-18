const pageList = {
    page: function (listQuery) {
        var sql = 'SELECT * FROM ' + listQuery.table;
        sql = this.condition(sql, listQuery)
        if (listQuery.page && listQuery.pageSize) {
            var pos = (listQuery.page - 1) * listQuery.pageSize
            var end = listQuery.page * listQuery.pageSize
            sql += ' LIMIT ' + pos + ',' + end
        }
        return sql
    },

    count: function (listQuery) {
        var sql = 'SELECT count(*) as count FROM ' + listQuery.table;
        sql = this.condition(sql, listQuery)
        return sql
    },

    condition: function (sql, listQuery) {
        var d = listQuery.like
        if (d != undefined) {
            sql += ' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' like '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element
                }
            }

        }
        d = listQuery.and
        if (d != undefined) {
            sql += ' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element
                }
            }

        }
        d = listQuery.or
        if (d != undefined) {
            sql += ' where 1=2 '
            for (const key in d) {
                sql = sql + ' OR ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += '"' + element + '"'
                }
            }

        }
        return sql
    }
}

const base = {
    getCourseList: function (params) {
        var sql = 'select * from  pub_content where id in ('
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sql += element + ","
        }
        sql = sql.substring(0, sql.lastIndexOf(','))
        sql += ')'
        return sql;
    },
    getList: function (table, params) {
        var sql = 'select * from ' + table + ' where id in ('
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sql += element + ","
        }
        sql = sql.substring(0, sql.lastIndexOf(','))
        sql += ')'
        return sql;
    },
}



const work = {
    delete: 'delete  from work where id=?'
}

const customers = {
    login: 'select * from customers where tel=? AND password=?'
}
/**  首页 */
const resource = {
    getAll: 'select * from resource',
    getOne: 'select * from resource where id=?'
}
//实战
const reclist = {
    getAll: 'select * from reclist'
}
//好课程
const newlist = {
    getAll: 'select * from newlist'
}

//猿问
const wendalist = {
    getAll: 'select * from wendalist'
}

/**  详情 */
const classData = {
    getClassData: 'select * from classData where id=?'
}

const chapterlist = {
    getChapterlist: 'select * from chapterlist cl where cl.cla_id in (select c.id from classData c where c.id=?)'
}

const intro = {
    getIntro: 'select * from intro cl where cl.cla_id = ?',
    getOne: 'select * from intro cl where cl.id = ?'
}

const teacherOpt = {
    getTeacher: 'select * from teacher cl where cl.cla_id = ?',
    getOne: 'select * from teacher cl where cl.id = ?'
}

const rate = {
    getrate: 'select * from rate cl where cl.cla_id in (select c.id from classData c where c.id=?)'
}


/**  课程 */

const course_class = {
    getAll: 'select * from course_class cl'
}

const typelist = {
    find: 'select * from typelist cl where cc_id=?'
}

const courselist = {
    find: 'select * from courselist cl where cc_id=?'
}



const userOpt = {
    login: 'select * from user where username="?" and password="?" ',
    getOne: 'select * from user where username="?"',
}

const erea_info = {
    getOne: 'select * from erea_info where id=?',
    getAll: 'select * from erea_info',
    find: 'select * from pub_content where cus_id=?',
    findByTitle: 'select * from pub_content where title like "%?%"',
    delete: 'delete  from pub_content where id=?',
    inc_like: 'update pub_content set like_count=like_count+1 where id=?',
    des_like: 'update pub_content set like_count=like_count-1 where id=?',
    inc_com: 'update pub_content set com_count=com_count+1 where id=?',
    des_com: 'update pub_content set com_count=com_count-1 where id=?',
    topN: 'SELECT * FROM pub_content ORDER BY like_count DESC LIMIT 0,3'
}

const exp_plan = {
    getAll: 'SELECT * FROM exp_plan',
    yuyue: 'update exp_plan set remaind=remaind-1 where course_number="?"',
    cancel_yuyue: 'update exp_plan set remaind=remaind+1 where course_number="?"'
}

const experiment = {

    getAll: 'SELECT * FROM experiment',

    getOne: 'select * from experiment where id=?'
}


const course = {
    getAll: 'select * from course',
    find: 'select c.id ,c.cus_nickname,c.`comment`,c.cus_id,c.pub_id ,date_format(c.create_time,"%Y-%m-%d %T) AS create_time from course c where pub_id=?',
}

function html_encode(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/&/g, "&gt;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
}

function html_decode(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/&gt;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	return s;
}

const article = {
    getOne: 'select * from article where id=?',
    read:'update article set `read`=1,tea="?" where id=?',
    next:'update article set state="?" where id=?'
}

const notice = {
    getAll: 'select * from notice',
    find: 'select * from notice where ',
}

module.exports = {
    pageList,

    work,
    base,
    customers,
    resource,
    reclist,
    newlist,
    wendalist,
    classData,// 详情
    chapterlist,
    intro,
    teacherOpt,
    rate,
    course,
    course_class,
    typelist,
    courselist,
    article,
    userOpt,
    exp_plan,
    erea_info,
    experiment,
    html_encode,
    html_decode,
    notice
};