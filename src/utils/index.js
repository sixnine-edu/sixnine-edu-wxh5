export function isAuth(key) {
	let authorities = JSON.parse(sessionStorage.getItem("authorities") || "[]")

	if (authorities.length) {
		for (const i in authorities) {
			const element = authorities[i]
			if (element.authority === key) {
				return true
			}
		}
	}
	return false
}

export function deepClone(obj) {
	if (Array.isArray(obj)) {
		return obj.map(deepClone)
	} else if (obj && typeof obj === "object") {
		var cloned = {}
		var keys = Object.keys(obj)
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i]
			cloned[key] = deepClone(obj[key])
		}
		return cloned
	} else {
		return obj
	}
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(arr, id = "id", pid = "parentId") {
	let data = deepClone(arr)
	var res = []
	var temp = {}
	for (var i = 0; i < data.length; i++) {
		temp[data[i][id]] = data[i]
	}
	for (var k = 0; k < data.length; k++) {
		if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
			if (!temp[data[k][pid]]["children"]) {
				temp[data[k][pid]]["children"] = []
			}
			if (!temp[data[k][pid]]["_level"]) {
				temp[data[k][pid]]["_level"] = 1
			}
			data[k]["_level"] = temp[data[k][pid]]._level + 1
			temp[data[k][pid]]["children"].push(data[k])
		} else {
			res.push(data[k])
		}
	}
	return res
}


export function getUrlParam(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(
		/\+/g, '%20')) || null
}
