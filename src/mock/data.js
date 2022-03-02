
export const condition = {
	gradeData: {
		name: "年级",
		type: "gradeId",
		list: [{
				id: 2,
				name: "一年级",
				subjectProductIds: [22]
			},
			{
				id: 3,
				name: "二年级",
				subjectProductIds: [22]
			},
			{
				id: 4,
				name: "三年级",
				subjectProductIds: [22]
			},
			{
				id: 5,
				name: "四年级",
				subjectProductIds: [22]
			},
			{
				id: 6,
				name: "五年级",
				subjectProductIds: [22]
			},
			{
				id: 7,
				name: "六年级",
				subjectProductIds: [22]
			},
			{
				id: 84,
				name: "幼小衔接",
				subjectProductIds: [22]
			}
		]
	},
	bookVersionData: {
		name: "教材版本",
		type: "bookVersionId",
		list: [{
				id: 1,
				name: "人教版",
				subjectProductId: 22
			},
			{
				id: 2,
				name: "北师版",
				subjectProductId: 22
			},
			{
				id: 5,
				name: "苏教版",
				subjectProductId: 22
			},
			{
				id: 6,
				name: "冀教版",
				subjectProductId: 22
			},
			{
				id: 7,
				name: "沪教版",
				subjectProductId: 22
			},
			{
				id: 9,
				name: "青岛版",
				subjectProductId: 22
			},
			{
				id: 12,
				name: "其它",
				subjectProductId: 22
			},
			{
				id: 13,
				name: "全国版",
				subjectProductId: 22
			},
			{
				id: 14,
				name: "北京版",
				subjectProductId: 22
			}
		]
	},
	schemeData: {
		name: "体系",
		type: "schemeId",
		list: [{
				id: 48,
				name: "思维突破",
				subjectProductId: 22
			},
			{
				id: 56,
				name: "能力精英",
				subjectProductId: 22
			},
			{
				id: 57,
				name: "思维创新",
				subjectProductId: 22
			},
			{
				id: 80,
				name: "创新",
				subjectProductId: 22
			},
			{
				id: 102,
				name: "能力冲刺",
				subjectProductId: 22
			},
			{
				id: 106,
				name: "能力提高",
				subjectProductId: 22
			},
			{
				id: 139,
				name: "能力强化",
				subjectProductId: 22
			},
			{
				id: 141,
				name: "幼小衔接",
				subjectProductId: 22
			},
			{
				id: 157,
				name: "V计划",
				subjectProductId: 22
			}
		]
	},
	periodData: {
		name: "学期",
		type: "periodId",
		list: [{
				id: 2,
				name: "暑假"
			},
			{
				id: 3,
				name: "秋季"
			},
			{
				id: 4,
				name: "寒假"
			},
			{
				id: 1,
				name: "春季"
			}
		]
	},
	yearData: {
		name: "年份",
		type: "yearId",
		list: [{
				id: 2022,
				name: "2022"
			},
			{
				id: 2021,
				name: "2021"
			},
			{
				id: 2020,
				name: "2020"
			},
			{
				id: 2019,
				name: "2019"
			},
			{
				id: 2018,
				name: "2018"
			},
			{
				id: 2017,
				name: "2017"
			},
			{
				id: 2016,
				name: "2016"
			}
		]
	},
	examData: {
		name: "考区",
		type: "examId",
		list: []
	},
	defaultMap: {
		examId: 0,
		gradeId: 2,
		periodId: 1,
		bookVersionId: 0,
		yearId: 2021,
		subjectProId: 22,
		schemeId: 0,
		kindClassTypeId: 0,
		subjectId: 2
	},
	kindOfClassType: {
		name: "类别",
		type: "kindClassTypeId",
		list: [{
				id: 1,
				name: "长线课"
			},
			{
				id: 2,
				name: "公开课"
			},
			{
				id: 3,
				name: "短线课"
			}
		]
	},
}

export const courseList= [{
					courseId: 4,
					coverImg: "https://janbird-img.mayuwl.com/4b1c33a7b02246c7a4b5d088975f473f.jpg",
					title: "日系二次元眼睛绘画教程",
					info: "眼睛总是画不好，学不会？快来海洋老师的温馨小课堂学习日系二次元眼睛绘制教程，教你一步搞定线稿，光影！",
					courseCategoryId: 7,
					state: 1,
					createTime: "2021-02-27 11:15:36",
					createBy: 1,
					updateTime: "2021-02-27 11:15:36",
					updateBy: 1,
				},
				{
					courseId: 3,
					coverImg: "https://janbird-img.mayuwl.com/4cf71fcd5c1f4d9abcbb69e90bd7a72e.jpg",
					title: "人体结构基础绘画公开课",
					info: "就是不会画人，不知道怎样训练？手把手带你训练人体结构，变身原创绘画大触！",
					courseCategoryId: 7,
					state: 1,
					createTime: "2021-02-27 10:51:18",
					createBy: 1,
					updateTime: "2021-02-27 10:51:29",
					updateBy: 1,
				},
				{
					courseId: 2,
					coverImg: "https://janbird-img.mayuwl.com/9f0e92f1c5d84b1ab406352074abbf3f.png",
					title: "素描·石膏像雕塑",
					info: "艺术高考美术专业素描示范课程——素描石膏雕塑",
					courseCategoryId: 11,
					state: 1,
					createTime: "2021-02-25 14:17:50",
					createBy: 1,
					updateTime: "2021-02-25 14:21:33",
					updateBy: 1,
				},
				{
					courseId: 1,
					coverImg: "https://janbird-img.mayuwl.com/beb5b7531df8423a90f97e456e2ab844.jpg",
					title: "系统教学·绘画基础高阶课程·色彩课【祝凯教学】",
					info: "油画基础班所讲的内容为欧洲的绘画体系，这套系统中的绘画思路、观察方法等都有别于传统的俄罗斯体统，欧洲绘画系统可以让学员在短时间内了解掌握绘画知识及培养提高绘画自学能力。（本期课程所讲知识是整套欧洲体系的基础课程。）",
					courseCategoryId: 3,
					state: 1,
					createTime: "2021-02-25 14:00:08",
					createBy: 1,
					updateTime: "2021-02-25 14:21:47",
					updateBy: 1,
				},
			]