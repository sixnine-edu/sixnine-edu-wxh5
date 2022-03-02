/*
 * @Author: yongqing
 * @Date:   2019-01-19 11:14:26
 * @Last Modified by:   yongqing
 * @Last Modified time: 2019-11-12 15:22:51
 */

import request from "@/utils/request"

/**
 * 获取课程列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function getCourses(params) {
	return request({
		url: `/corp/teacher/courses`,
		method: "get",
		params: params,
	})
}

export function getTrainings(params) {
	return request({
		url: `/corp/teacher/lives`,
		method: "get",
		params: params,
	})
}

export function getChapters(params) {
	return request({
		url: `/corp/teacher/chapters`,
		method: "get",
		params: params,
	})
}
export function getChapterVideoAndEbook(params) {
	return request({
		url: `/corp/teacher/chapterVideoAndEbook`,
		method: "get",
		params: params,
	})
}
export function queryDownloadUrl(params) {
	return request({
		url: `/corp/oss/preDownloadUrl/${params.key}`,
		method: "get",
		params: params,
	})
}
export function getVideoPlayAuth(params) {
	return request({
		url: `/corp/oss/vod/playAuth/${params.key}`,
		method: "get",
		params: params,
	})
}

/**
 * 登录
 * @param {转发} data
 */
export function corpLogin(data) {
	return request({
		url: `/corpLogin`,
		method: "post",
		data,
	})
}


/**
 * 获取菜单和权限
 */
export function menuNav() {
	return request({
		url: "/corp/menu/nav",
		method: "get"
	})
}
