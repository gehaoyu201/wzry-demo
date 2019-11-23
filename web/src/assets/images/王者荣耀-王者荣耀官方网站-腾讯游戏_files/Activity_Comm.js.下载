var GetQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substring(1).match(reg);
	if (r != null) return unescape(r[2]).replace(/<iframe/g,"").replace(/<\/iframe>/g,"").replace(/<script/g,"").replace(/<\/script>/g,"").replace(/document.write/g,"").replace(/</g,"").replace(/>/g,"").replace(/alert/g,"").replace(/eval/g,"").replace(/"/g,"").replace(/'/g,""); return null;
};
var postFormData = function(postdata) {
	$("#submit_form").attr('action', G_MSG.G_url);
	$("#submit_form").html("<input id='submit_form_r0' name='r0' type='hidden' value='frame' />");
	if (postdata) {
		for (var x in postdata) {
			var v = postdata[x].toString().replace(/(\')/g, "");
			$("#submit_form").append("<input id='submit_form_" + x + "' name='" + x + "' type='hidden' value='" + v + "' />");
		}
		$("#submit_form").submit();
	}
};
var postScriptData = function(postdata, callback) {
	if (postdata) {
		var p = G_MSG.G_url + '?';
		for (var x in postdata) {
			p += x + '=' + postdata[x] + '&';
		}
		p += 'r=' + Math.random();
		$.getScript(p, function() {
			eval('var data=' + postdata['r1'] + ';');
			callback(data);
		});
	}
};
var G_defer_cache_map = {};

function request(url, varname, cache) {
	if (!G_defer_cache_map[url] || cache) {
		var dtd = $.Deferred();
		$.getScript(url, function() {
			eval('var tmpObj=' + varname + ';');
			if ('object' == typeof(tmpObj)) {
				if (0 == tmpObj.status) {
					dtd.resolve(tmpObj);
				} else {
					dtd.reject(tmpObj);
				}
			}
		});
		G_defer_cache_map[url] = dtd.promise();
	}
	return G_defer_cache_map[url];
}

function requestJSONP(url, cache) {
	if (!G_defer_cache_map[url] || cache) {
		var dtd = $.Deferred();
		$.getJSON(url, function(tmpObj) {
			if ('object' == typeof(tmpObj)) {
				if (0 == tmpObj.retCode) {
					dtd.resolve(tmpObj);
				} else {
					dtd.reject(tmpObj);
				}
			}
		});
		G_defer_cache_map[url] = dtd.promise();
	}
	return G_defer_cache_map[url];
}
var postScriptDeferData = function(postdata, cache) {
	if (postdata) {
		var reqURL = G_MSG.G_url + '?';
		for (var x in postdata) {
			reqURL += x + '=' + postdata[x] + '&';
		}
		return request(reqURL, postdata['r1'], cache);
	}
};

function postGetScirptDeferData(url, r1, cache) {
	return request(url, r1, cache);
};

function postScriptDeferStaticData(url, cache) {
	return requestJSONP(url, cache);
};
var in_array = function(value, array) {
	for (var x in array) {
		if (value == array[x]) return true;
	}
	return false;
};

function EAS_TCSS_LOG(adTag) {
	EAS.SendClick({
		'e_c': adTag,
		'c_t': 4
	}); //首页上报eas
	pgvSendClick({
		hottag: adTag
	});
}

function callChange(id) {
	if (document.all) {
		document.getElementById(id).fireEvent("onchange");
	} else {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', true, true);
		document.getElementById(id).dispatchEvent(evt);
	}
}

function shuffle(inputArr) {
	var valArr = [],
		k = '',
		i = 0,
		strictForIn = false,
		populateArr = [];
	for (k in inputArr) { // Get key and value arrays
		if (inputArr.hasOwnProperty(k)) {
			valArr.push(inputArr[k]);
			if (strictForIn) {
				delete inputArr[k];
			}
		}
	}
	valArr.sort(function() {
		return 0.5 - Math.random();
	});
	// BEGIN REDUNDANT
	this.php_js = this.php_js || {};
	this.php_js.ini = this.php_js.ini || {};
	// END REDUNDANT
	strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
		.ini['phpjs.strictForIn'].local_value !== 'off';
	populateArr = strictForIn ? inputArr : populateArr;
	for (i = 0; i < valArr.length; i++) { // Repopulate the old array
		populateArr[i] = valArr[i];
	}
	return strictForIn || populateArr;
}

function js_htmlspecialchars_decode(html) {
	html = html.replace(/&amp;/gi, '&');
	html = html.replace(/&amp;/gi, '&');
	html = html.replace(/&ldquo;/gi, '“');
	html = html.replace(/&rdquo;/gi, '”');
	html = html.replace(/nbsp/gi, 'nbsp;');
	html = html.replace(/&quot;/gi, '"');
	html = html.replace(/&#039;/gi, '\'');
	html = html.replace(/&lt;([\/]?(p|img|span|strong|br|h\d|div|table|source|tbody|audio|object|thead|tfoot|tr|th|td|dd|dt|dl|ul|li|ol|a|embed|iframe))/gi, "<$1");
	html = html.replace(/&gt;/gi, '>');
	html = html.replace(/<img [^>]*src=['"]?([^'" ]+)[^>]*>/gi, function(match, src) {
		return '<img src=' + src + '>';
	});
	return html;
}

function GetNowFormatDate() {
	var day = new Date();
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	//初始化时间 
	//Year= day.getYear();//有火狐下2008年显示108的bug 
	Year = day.getFullYear(); //ie火狐下都可以 
	Month = day.getMonth() + 1;
	Day = day.getDate();
	//Hour = day.getHours(); 
	// Minute = day.getMinutes(); 
	// Second = day.getSeconds(); 
	CurrentDate += Year + "-";
	if (Month >= 10) {
		CurrentDate += Month + "-";
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate += Day;
	} else {
		CurrentDate += "0" + Day;
	}
	return CurrentDate;
}
//多余字符应省略号标识
function CheckStringLength(str, length) {
	if (str.length > length) {
		return str.substring(0, length) + '...';
	} else {
		return str;
	}
}
/** 点赞框和评论框计数显示效果 **/
function outNum(num) {
	num = parseInt(num);
	if (num < 1000) {
		return '' + num;
	} else if (num >= 1000 && num < 10000) {
		return (num / 1000).toFixed(1) + 'K';
	} else if (num >= 10000 && num < 100000) {
		return (num / 10000).toFixed(1) + 'W';
	} else if (num >= 100000 && num < 990000) {
		return (num / 10000).toFixed(0) + 'W';
	} else {
		return '99W';
	}
}
//PHPdate函数
function date(format, timestamp) {
	var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
	var pad = function(n, c) {
		if ((n = n + "").length < c) {
			return new Array(++c - n.length).join("0") + n;
		} else {
			return n;
		}
	};
	var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var txt_ordin = {
		1: "st",
		2: "nd",
		3: "rd",
		21: "st",
		22: "nd",
		23: "rd",
		31: "st"
	};
	var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var f = {
		d: function() {
			return pad(f.j(), 2)
		},
		D: function() {
			return f.l().substr(0, 3)
		},
		j: function() {
			return jsdate.getDate()
		},
		l: function() {
			return txt_weekdays[f.w()]
		},
		N: function() {
			return f.w() + 1
		},
		S: function() {
			return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
		},
		w: function() {
			return jsdate.getDay()
		},
		z: function() {
			return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
		},
		W: function() {
			var a = f.z(),
				b = 364 + f.L() - a;
			var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
			if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
					return date("W", Math.round(nd2.getTime() / 1000));
				} else {
					return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},
		F: function() {
			return txt_months[f.n()]
		},
		m: function() {
			return pad(f.n(), 2)
		},
		M: function() {
			return f.F().substr(0, 3)
		},
		n: function() {
			return jsdate.getMonth() + 1
		},
		t: function() {
			var n;
			if ((n = jsdate.getMonth() + 1) == 2) {
				return 28 + f.L();
			} else {
				if (n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},
		L: function() {
			var y = f.Y();
			return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
		},
		Y: function() {
			return jsdate.getFullYear()
		},
		y: function() {
			return (jsdate.getFullYear() + "").slice(2)
		},
		a: function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A: function() {
			return f.a().toUpperCase()
		},
		B: function() {
			var off = (jsdate.getTimezoneOffset() + 60) * 60;
			var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
			var beat = Math.floor(theSeconds / 86.4);
			if (beat > 1000) beat -= 1000;
			if (beat < 0) beat += 1000;
			if ((String(beat)).length == 1) beat = "00" + beat;
			if ((String(beat)).length == 2) beat = "0" + beat;
			return beat;
		},
		g: function() {
			return jsdate.getHours() % 12 || 12
		},
		G: function() {
			return jsdate.getHours()
		},
		h: function() {
			return pad(f.g(), 2)
		},
		H: function() {
			return pad(jsdate.getHours(), 2)
		},
		i: function() {
			return pad(jsdate.getMinutes(), 2)
		},
		s: function() {
			return pad(jsdate.getSeconds(), 2)
		},
		O: function() {
			var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
			else t = "+" + t;
			return t;
		},
		P: function() {
			var O = f.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		c: function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		U: function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};

	return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
		if (t != s) {
			// escaped  
			ret = s;
		} else if (f[s]) {
			// a date function exists  
			ret = f[s]();
		} else {
			// nothing special  
			ret = s;
		}
		return ret;
	});
}
//秒数转分钟
function formatSeconds(value) {
	var theTime = parseInt(value); // 秒
	var theTime1 = 0; // 分
	var theTime2 = 0; // 小时
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var result = "" + parseInt(theTime) + "秒";
	if (theTime1 > 0) {
		result = "" + parseInt(theTime1) + "分" + result;
	}
	if (theTime2 > 0) {
		result = "" + parseInt(theTime2) + "小时" + result;
	}
	return result;
}

function array_count_values(array) {
	var tmp_arr = {},
		key = '',
		t = '';

	var __getType = function(obj) {
		// Objects are php associative arrays.
		var t = typeof obj;
		t = t.toLowerCase();
		if (t === 'object') {
			t = 'array';
		}
		return t;
	};

	var __countValue = function(value) {
		switch (typeof value) {
			case 'number':
				if (Math.floor(value) !== value) {
					return;
				}
				// Fall-through
			case 'string':
				if (value in this && this.hasOwnProperty(value)) {
					++this[value];
				} else {
					this[value] = 1;
				}
		}
	};

	t = __getType(array);
	if (t === 'array') {
		for (key in array) {
			if (array.hasOwnProperty(key)) {
				__countValue.call(tmp_arr, array[key]);
			}
		}
	}

	return tmp_arr;
}
//mt_rand取随机数
function mt_rand(min, max) {
	//  discuss at: http://phpjs.org/functions/mt_rand/
	// original by: Onno Marsman
	// improved by: Brett Zamir (http://brett-zamir.me)
	//    input by: Kongo
	//   example 1: mt_rand(1, 1);
	//   returns 1: 1

	var argc = arguments.length;
	if (argc === 0) {
		min = 0;
		max = 2147483647;
	} else if (argc === 1) {
		throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
	} else {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//发布时间
function ReloadPubdate(string) {
	var re = /^(\d{2,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	if (re.test(string)) {
		var t = string.match(re);
		var d = new Date(t[1], t[2] - 1, t[3], t[4], t[5], t[6]);
		var c = new Date();
		var s = (c.getTime() - d.getTime()) / 1000;
		var m = Math.floor(s / 60);
		var h = Math.floor(s / 3600);
		var d = Math.floor(s / 86400);
		var n = Math.floor(s / (86400 * 30));
		var y = Math.floor(s / (86400 * 365));
		if (y > 0) return y + "年以前";
		if (n > 0) return n + "个月以前";
		if (d > 0) return d + "天以前";
		if (h > 0) return h + "小时以前";
		if (m > 0) return m + "分钟以前";
	}
	return "刚刚";
}

function strtotime(text, now) {
	var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;
	if (!text) {
		return fail;
	}
	text = text.replace(/^\s+|\s+$/g, '')
		.replace(/\s{2,}/g, ' ')
		.replace(/[\t\r\n]/g, '')
		.toLowerCase();
	match = text.match(
		/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
	if (match && match[2] === match[4]) {
		if (match[1] > 1901) {
			switch (match[2]) {
				case '-':
					{ // YYYY-M-D
						if (match[3] > 12 || match[5] > 31) {
							return fail;
						}

						return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case '.':
					{ // YYYY.M.D is not parsed by strtotime()
						return fail;
					}
				case '/':
					{ // YYYY/M/D
						if (match[3] > 12 || match[5] > 31) {
							return fail;
						}

						return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
			}
		} else if (match[5] > 1901) {
			switch (match[2]) {
				case '-':
					{ // D-M-YYYY
						if (match[3] > 12 || match[1] > 31) {
							return fail;
						}

						return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case '.':
					{ // D.M.YYYY
						if (match[3] > 12 || match[1] > 31) {
							return fail;
						}

						return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case '/':
					{ // M/D/YYYY
						if (match[1] > 12 || match[3] > 31) {
							return fail;
						}

						return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
			}
		} else {
			switch (match[2]) {
				case '-':
					{ // YY-M-D
						if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
							return fail;
						}

						year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
						return new Date(year, parseInt(match[3], 10) - 1, match[5],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case '.':
					{ // D.M.YY or H.MM.SS
						if (match[5] >= 70) { // D.M.YY
							if (match[3] > 12 || match[1] > 31) {
								return fail;
							}

							return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
								match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
						}
						if (match[5] < 60 && !match[6]) { // H.MM.SS
							if (match[1] > 23 || match[3] > 59) {
								return fail;
							}

							today = new Date();
							return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
								match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
						}

						return fail; // invalid format, cannot be parsed
					}
				case '/':
					{ // M/D/YY
						if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
							return fail;
						}

						year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
						return new Date(year, parseInt(match[1], 10) - 1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case ':':
					{ // HH:MM:SS
						if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
							return fail;
						}

						today = new Date();
						return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
							match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
					}
			}
		}
	}

	// other formats and "now" should be parsed by Date.parse()
	if (text === 'now') {
		return now === null || isNaN(now) ? new Date()
			.getTime() / 1000 | 0 : now | 0;
	}
	if (!isNaN(parsed = Date.parse(text))) {
		return parsed / 1000 | 0;
	}

	date = now ? new Date(now * 1000) : new Date();
	days = {
		'sun': 0,
		'mon': 1,
		'tue': 2,
		'wed': 3,
		'thu': 4,
		'fri': 5,
		'sat': 6
	};
	ranges = {
		'yea': 'FullYear',
		'mon': 'Month',
		'day': 'Date',
		'hou': 'Hours',
		'min': 'Minutes',
		'sec': 'Seconds'
	};

	function lastNext(type, range, modifier) {
		var diff, day = days[range];

		if (typeof day !== 'undefined') {
			diff = day - date.getDay();

			if (diff === 0) {
				diff = 7 * modifier;
			} else if (diff > 0 && type === 'last') {
				diff -= 7;
			} else if (diff < 0 && type === 'next') {
				diff += 7;
			}

			date.setDate(date.getDate() + diff);
		}
	}

	function process(val) {
		var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
			type = splt[0],
			range = splt[1].substring(0, 3),
			typeIsNumber = /\d+/.test(type),
			ago = splt[2] === 'ago',
			num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

		if (typeIsNumber) {
			num *= parseInt(type, 10);
		}

		if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
			return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
		}

		if (range === 'wee') {
			return date.setDate(date.getDate() + (num * 7));
		}

		if (type === 'next' || type === 'last') {
			lastNext(type, range, num);
		} else if (!typeIsNumber) {
			return false;
		}

		return true;
	}

	times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
		'|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
		'|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
	regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

	match = text.match(new RegExp(regex, 'gi'));
	if (!match) {
		return fail;
	}
	for (i = 0, len = match.length; i < len; i++) {
		if (!process(match[i])) {
			return fail;
		}
	}
	return (date.getTime() / 1000);
}
//格式化数字为9,999,999的格式
function FormateNum(num) { //转换为千进位  
	//1.先去除空格,判断是否空值和非数   
	num = num + "";
	num = num.replace(/[ ]/g, ""); //去除空格  
	if (num == "") {
		return;
	}
	if (isNaN(num)) {
		return;
	}
	//2.针对是否有小数点，分情况处理   
	var index = num.indexOf(".");
	if (index == -1) { //无小数点   
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(num)) {
			num = num.replace(reg, "$1,$2");
		}
	} else {
		var intPart = num.substring(0, index);
		var pointPart = num.substring(index + 1, num.length);
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(intPart)) {
			intPart = intPart.replace(reg, "$1,$2");
		}
		num = intPart + "." + pointPart;
	}
	return num;
}

function GetPageurl() {
	var url = window.location.href; //获取完整URL地址
	var tmp = ''; //临时变量，用于保存分割字符串
	tmp = url.split("/"); //按照"/"分割
	var cc = tmp[tmp.length - 1]; //获取最后一部分，即文件名和参数
	tmp = cc.split("?"); //把参数和文件名分割开
	return tmp[0].split(".")[0]; //返回值
}
//数组去重
function array_unique(inputArr) {
	var key = '',
		tmp_arr2 = {},
		val = '';

	var __array_search = function(needle, haystack) {
		var fkey = '';
		for (fkey in haystack) {
			if (haystack.hasOwnProperty(fkey)) {
				if ((haystack[fkey] + '') === (needle + '')) {
					return fkey;
				}
			}
		}
		return false;
	};

	for (key in inputArr) {
		if (inputArr.hasOwnProperty(key)) {
			val = inputArr[key];
			if (false === __array_search(val, tmp_arr2)) {
				tmp_arr2[key] = val;
			}
		}
	}

	return tmp_arr2;
}

function prDates(start, end) {
	var map = [];
	dt_start = strtotime(start);
	dt_end = strtotime(end);
	while (dt_start <= dt_end) {
		map.push(date('Y-m-d', dt_start));
		dt_start = strtotime('+1 day', dt_start);
	}
	return map;
}

function getSeverDateTime() {
	var date = milo.getSeverDateTime();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	var minute = date.getMinutes();
	minute = minute < 10 ? ('0' + minute) : minute;
	var sec = date.getSeconds();
	sec = sec < 10 ? ('0' + sec) : sec;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ":" + sec;
}
//获取牛评
function GetNPComment(iComment, ElementId, source) {
	cmt_id = iComment;
	CreateCommentIframe(ElementId, source);
}

function CreateCommentIframe(ElementId, source) {
	var iframe = document.createElement('iframe');
	iframe.id = 'commentIframe';
	iframe.border = 0;
	iframe.scrolling = 'no';
	iframe.style.border = 'none';
	iframe.frameBorder = "no";
	iframe.width = '100%';
	iframe.height = '100%';
	bindIframeOnloadEvent(iframe, function() {
		if (source == 'app') {
			QueryLoginUserInfoAPP();
		} else {
			QueryLoginUserInfo();
		}
		jQuery('#commentIframe').contents().find('#top_reply').find('span').eq(1).hide();
		jQuery('#commentIframe').contents().find('.change').hide();
		jQuery('#commentIframe').contents().find('.np-nav-tab').hide();
		jQuery('#commentIframe').contents().find('.np-index-link').hide();
	});
	iframe.src = 'http://www.qq.com/coral/coralBeta3/coralMainDom3.0.htm';
	document.getElementById(ElementId).appendChild(iframe);
	setTimeout(function() {
		document.getElementById(ElementId).style.display = 'block';
	}, 1000);

};
//获取牛评内头像等信息
function QueryLoginUserInfo() {
	need("biz.login", function(LoginManager) {
		LoginManager.checkLogin(function() {
			var nickName = '';
			var userFace = '';
			LoginManager.getNickName(function(loginInfo) {
				if (loginInfo.isLogin) {
					nickName = loginInfo.nickName;
					LoginManager.getUserFace(function(data) {
						userFace = data.userFace;
						registerCoralEvent.publicLogined(LoginManager.getUserUin(), nickName, userFace);
					});
				}
			});
		});
	});
}
//获取APP牛评内头像等信息
function QueryLoginUserInfoAPP() {
	need("biz.login", function(LoginManager) {
		LoginManager.checkLogin(function() {
			milo.loader.loadScript("http://ptlogin2.qq.com/getface?appid=21000501&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + LoginManager.getUserUin(), function() {});
		});
	});
}
var pt = {
	setHeader: function(pObj) {
		need("biz.login", function(LoginManager) {
			LoginManager.checkLogin(function() {
				var uin = LoginManager.getUserUin();
				var nick = LoginManager.getNickName();
				var src = pObj[uin];
				registerCoralEvent.publicLogined(uin, nick, src);
			}, function() {});
		});
	}
};
//IFRAME绑定后事件
function bindIframeOnloadEvent(el, onload) {
	if (el.attachEvent) {
		el.attachEvent("onload", onload);
	} else {
		el.onload = onload;
	}
};
//获取IFRAME元素
function getIframeWindow(el) {
	return el.contentWindow || el.contentDocument.parentWindow;
};
var registerCoralEvent = {
	//site:G_MSG.G_site, // 视频为vedio 看比赛为kbs 电脑管家为 pm ---- 频道分离
	//site1:'film',
	//site2:'client',
	//code: 0, // 1.页面为gbk 0为utf-8
	//source: 9,  // 不同平台需要定义此参数

	//subsource:9.1,
	//listHiden: 0, // 不显示评论，只显示评论框 - 奇葩需求  1为不显示 0为显示
	//ownStyle: 'http://lol.qq.com/m/act/a20150930live/css/live.css',  // 私有样式可复写评论样式 // **不推荐
	//commentNums:2, // 首屏默认显示评论条数。默认值 10条 （有可能显示的条数比设置的少，是因为部分评论审核未通过不予显示），0是彻底关闭
	//commentHotNums:3 , // 热评数量
	//commentLink: 0,  // 0 是不需要链接

	//commentPost: 0,  // 0 不跳转
	//commentHot:0, // 默认有置顶评论，如果设置为 0 取消置顶评论
	//popupInfo:0,  // 点头像弹浮层 1:开启，0：关闭
	//popupLink:0,  // 点头置顶帖后按钮浮层 1:开启，0：关闭
	//reportBtn:0,  // 举报功能：1,开启， 0：关闭


	loginEvent: function() {
		//parent.CheckLogin();
		parent.need("biz.login", function(LoginManager) {
			LoginManager.login();
		});
		//document.getElementById('onekey').onclick(); // 注册登陆事件 ----需要修改
	},
	publicLogined: function(uin, nick, headUrl) { // 20130716 登陆成功回调  ----需要执行
		document.getElementById('commentIframe').contentWindow.publicLogined(uin, nick, headUrl);
	},
	publicLogout: function() { // 退出回调  ----需要执行
		document.getElementById('commentIframe').contentWindow.publicLogout();
	}
};

function GetLWSid() {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var maxPos = chars.length;
	var pwd = "";
	var timer = (new Date()).getTime().toString();
	if (typeof timer != "string") {
		timer = Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000).toString()
	}
	if (timer == undefined || timer == null) {
		var timerArr = Math.random().toString().split(".");
		timer = timerArr[1]
	}
	if (timer) {
		timer = timer.split("")
	}
	for (i = 0; i < 13; i++) {
		var rank = Math.floor(Math.random() * maxPos);
		pwd += chars.charAt(rank) + timer[i]
	}
	return pwd
};

function LWCookie(name, value, options) {
	if (typeof value != "undefined") {
		options = options || {};
		if (value === null) {
			value = "";
			options.expires = -1
		}
		var expires = "";
		if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == "number") {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 60 * 1000))
			} else {
				date = options.expires
			}
			expires = "; expires=" + date.toUTCString()
		}
		var path = options.path ? "; path=" + options.path : "";
		var domain = options.domain ? "; domain=" + options.domain : "";
		var secure = options.secure ? "; secure" : "";
		document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/^(\s|\u00A0)+/, "").replace(/(\s|\u00A0)+$/, "");
				if (cookie.substring(0, name.length + 1) == (name + "=")) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break
				}
			}
		}
		return cookieValue
	}
}

function SyntaxJSON(Obj) {
	var json = JSON.stringify(Obj, undefined, 4);
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return match;
	});
}
LWCookie("LW_sid", GetLWSid(), {
	expires: 525600,
	path: "/",
	domain: "qq.com"
});
var LW_uid = LWCookie("LW_uid");
if (LW_uid == undefined || LW_uid == null) {
	LWCookie("LW_uid", GetLWSid(), {
		expires: 525600,
		path: "/",
		domain: "qq.com"
	});
} /*  |xGv00|9036692a16cf95e8af00f414a4759458 */