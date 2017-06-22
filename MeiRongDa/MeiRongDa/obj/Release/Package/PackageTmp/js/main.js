/// <reference path="jquery-1.9.1.min.js" />
jQuery.fn.extend({
    getModalContentMaxHeight: function () {
        var m = this.parents(".modal:first");
        var foot_height = $(".modal-footer", m).outerHeight(true);
        var total = document.documentElement.clientHeight;
        return total - foot_height - this.top() - 5 - ($(".modal-body", m).outerHeight(true) - $(".modal-body", m).height()) - (($(".modal-dialog", m).outerHeight(true) - $(".modal-dialog", m).innerHeight()) / 2);
    },
    setToModalContentMaxHeight: function () {
        this.outerHeight(this.getModalContentMaxHeight());
    },
    getPoint: function () {
        var obj = this.get(0);
        if (obj) {
            var t = obj.offsetTop;
            var l = obj.offsetLeft;

            while (obj = obj.offsetParent) {
                t += obj.offsetTop;
                l += obj.offsetLeft;
            }
            return {
                top: t,
                left: l
            };
        } else return { top: null, left: null };
    },
    top: function () {
        return this.getPoint().top
    },
    droploadInit: function (procedureName, parameter, callback, pageSize) {

        pageSize = pageSize == null ? 10 : pageSize;
        this.attr("dropload-info", SetTemp_Object({
            "pageSize": pageSize,
            "pageNumber": 1,
            "parameter": parameter,
            "procedureName": procedureName,
            "callback": callback,
            "isload": true
        }));
        this.dropload({
            //scrollArea: window,
            loadDownFn: function (me) {
                if (!me) return;
                $(me.$element).droploadData(null, null, null, null, me);
            }
        });
    },
    droploadData: function (procedureName, parameter, callback, pageSize, me) {
        var $this = this;

        var info = GetTemp_Object($this.attr("dropload-info"));

        if (($this.is(':hidden') && !info.isload) || IsNullOrWhiteSpace(info)) {
            me.lock(false);
            return;
        }
        procedureName = IsNullToDefault(procedureName, info.procedureName);
        parameter = IsNullToDefault(parameter, info.parameter);
        callback = IsNullToDefault(callback, info.callback);
        pageSize = IsNullToDefault(pageSize, parseInt(info.pageSize));
        me = IsNullToDefault(me, info.me);
        var pageNumber = info.pageNumber;
        Send(procedureName, {
            pageSize: pageSize,
            pageNumber: pageNumber,
            parameter: parameter
        },
		function (rs) {
		    info.callback(rs);
		    var maxcount = info.pageSize * info.pageNumber;
		    if (!rs.result || rs.data[0].length == 0 || rs.data[0][0].totalcount <= maxcount) {
		        me.lock();
		        me.noData();
		    } else {
		        me.unlock();
		        me.noData(false);
		    }
		    me.resetload();
		});
        pageNumber++;
        SetTemp_Object({
            "pageSize": pageSize,
            "pageNumber": pageNumber,
            "parameter": parameter,
            "procedureName": procedureName,
            "callback": callback,
            "me": me,
            "isload": false
        },
		$this.attr("dropload-info"));
    },
    droploadRefresh: function (pageNumber, parameter) {
        var $this = this;
        var info = GetTemp_Object($this.attr("dropload-info"));
        SetTemp_Object($.extend({},
		info, {
		    "pageNumber": pageNumber,
		    "parameter": parameter
		}), $this.attr("dropload-info"));
        $this.droploadData();
    },
    refreshData: function (data) {
        this.fillData($.extend(this.getData(), data));
    },
    fillData: function (_data, _all,_event) {
        var item = this;
        _data["FROMCONTROLID"] = _data["CONTROLID"];
        if (IsNullOrWhiteSpace(item.getControlId()))
            _data["CONTROLID"] = GetOnlyId();
        for (var i in _data) {
            item.attr("data-" + i, typeof (_data[i]) != "string" ? JSON.stringify(_data[i]) : _data[i]);
            var entity = item.attr("data-entity");
            var condition = "[data-name='" + i + "']";
            var $this = $(condition, item);
            if (!IsNullOrWhiteSpace(entity)) condition += "[data-entity='" + entity + "']";
            var $ethis = $(condition, item);
            if ($ethis.length > 0) $this = $ethis;
            $this.filter(":not([data-entity])").setData(_data[i], _data, _all);
            $this.filter("[data-entity='" + entity + "']").setData(_data[i], _data, _all);
            $this.filter("[data-entity!='" + entity + "'][data-format='formatentity']").setData(_data[i], _data, _all);

        }
        $("[data-format='formatcalculation']", item).each(function () {
            $(this).setData($(this).attr("data-calculation-default") || 0, _data, _all);
        });
        item.attr({ "data-info": JSON.stringify(_data) });
        return item;
    },
    setData: function (_data, _all, _total) {
        var $this = this;
        var df = $this.attr("data-format");

        if ($this.is("input") || $this.is("select")) {
            $this.val(_data);
        } else {
            if (!df) $this.text(_data);
        }
        if (df) {
            var arr = df.split(",");
            for (var j = 0; j < arr.length; j++) {
                if (!IsNullOrWhiteSpace(arr[j])) FormatData(arr[j], $this, _data, _all, _total);
            }
        }
    },
    getData: function (_name) {
        try {
            if (_name)
                return JSON.parse(this.attr("data-" + _name));
            else
                return JSON.parse(this.attr("data-info"));
        } catch (ex) {
            return null;
        }

    },
    getControlId: function () {
        return this.attr("data-controlid");
    },
    getFromControlId: function () {
        return this.attr("data-fromcontrolid");
    },
    bindReplace: function (e, fn) {

        if (typeof (e) == "object") {
            for (var i in e) {
                this.off(e, e[i]).on(e, e[i])
            }
        } else this.off(e, fn).on(e, fn)
        return this;
    },
    serializeJson: function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    },
    styleToJson: function () {
        var style = this.attr("style");
        var json = {};
        try {
            $(style.split(";")).each(function () {
                var arr = this.split(":");
                if (!IsNullOrWhiteSpace(arr[0]) && !IsNullOrWhiteSpace(arr[1])) json[arr[0]] = arr[1];
            })
        } catch (e) {
            json = {};
        }
        return json;
    }

});
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};
var randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
var remind = {
    init: function () {
        var remindModal = $("#remindModal");
        if (remindModal.length == 0) {
            remindModal = $('<div class="modal fade bs-example-modal-sm index-top" id="remindModal" tabindex="-1" role="dialog" aria-labelledby="remindModalLabel"><div class="modal-dialog modal-sm" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="remindModalLabel"><span class="glyphicon glyphicon-warning-sign" style="color: #337ab7;">&nbsp;提示</span></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary">确定</button></div></div></div></div>');
            $("body").append(remindModal);
        } else {
            $("button", remindModal).show();
        }
    },
    alert: function (msg, yf, yt) {
        this.init();
        $(".modal-body", "#remindModal").html(msg);
        $(".btn-default", $(".modal-footer", "#remindModal")).hide();
        $(".btn-primary", $(".modal-footer", "#remindModal")).bindReplace("click",
		function () {
		    $("#remindModal").modal('hide');
		    if (yf) yf();
		}).text(yt == null ? "确定" : yt);
        $("#remindModal").modal('show');
    },
    confirm: function (msg, yf, nf, yt, nt, hf) {
        this.init();
        $(".modal-body", "#remindModal").html(msg);
        $(".btn-default", $(".modal-footer", "#remindModal")).bindReplace("click",
		function () {
		    if (nf) nf();
		}).text(nt == null ? "取消" : nt);
        $(".btn-primary", $(".modal-footer", "#remindModal")).bindReplace("click",
		function () {
		    $("#remindModal").modal('hide');
		    if (yf) yf();
		}).text(yt == null ? "确定" : yt);
        $('#remindModal').bindReplace('hidden.bs.modal',
		function (e) {
		    if (hf) hf();
		})
        $("#remindModal").modal('show');
    }
}

function GetResult(json, sign) {
    var result = {
        result: false,
        info: "",
        data: [],
        json: json,
        sign: sign
    };

    if (json != null) {
        if (typeof (json) == "string") {
            var data = $.parseJSON(json);
            result.json = json;
            result.result = data.Result;
            result.info = data.Info;
            result.data = data.Data;
        } else {
            var data = json.ds[0];
            if (data != null) {
                result.result = data.Result == "True" ? true : false;
                result.info = data.Info;
                for (var i in json) {
                    if (i != "ds") result.data.push(json[i]);
                }
            }
        }
    }
    return result;
}
var PAGE = {
    INDEX: "index.html",
    LOGIN: "login.html"
};
var PROCEDURE = {
    LOGIN: "login",
    GETTHEME: "getTheme",
    GETYUANGONGXINXI: "getYuanGongXinXi",
    PLACEORDER: "placeOrder",
    GETCUSTOMER: "getCustomer",
    GETLIAOCHENGANDCHUXIAO: "getLiaoChengAndChuXiao",
    GETCHANPINANDXIANGMU: "getChanPinAndXiangMu",
    GETYIYOULIAOCHENG: "getYiYouLiaoCheng",
    GETXIANGMUBYYUYUE: "getXiangMuByYuYue",
    GETFANGJIAN: "getFangJian",
    GETPRINTTICKERTAPE :"getPrintTickertape"
};

var CALCULATION = {
    PLUS: "plus",
    MINUS: "minus"
}
//类型
var CLASS = {
    1: "消费项目",
    2: "消费产品",
    3: "消费疗程",
    4: "消费促销",
    5: "预定项目",
    6: "预定产品",
    7: "预定疗程",
    8: "预定促销",
    9: "续收项目",
    10: "续收产品",
    11: "续收疗程",
    12: "续收促销",
    15: "使用疗程",
    13: "会员充值"
};
//操作
var OPERATION = {
    CONSUMPTION: {
        KEY: 1,
        TEXT: "消费"
    },
    RESERVE: {
        KEY: 2,
        TEXT: "预定"
    },
    RENEWAL: {
        KEY: 3,
        TEXT: "续收"
    },
    USE: {
        KEY: 4,
        TEXT: "使用"
    }
};
//基础类型
var BASICSTYPE = {
    PROJECT: {
        KEY: 1,
        TEXT: "项目"
    },
    PRODUCT: {
        KEY: 2,
        TEXT: "产品"
    },
    COURSEOFTREATMENT: {
        KEY: 3,
        TEXT: "疗程"
    },
    PROMOTION: {
        KEY: 4,
        TEXT: "促销"
    }
}
//模块
var MODULAR = {
    PROJECTPRODUCTS: 1,
    COURSEPROMOTION: 2,
    HAVECOURSE: 3
}
function GetBasicsTypeByKey(k) {
    for (var i in BASICSTYPE) {
        if (BASICSTYPE[i].KEY == k) return BASICSTYPE[i];
    }

    return null;
}
function GetClassKey(o, b) {
    return (o.KEY - 1) * 4 + b.KEY;
}
//页面
var Page = {
    goLogin: function (fn) {
        var $this = this;
        $this.go(PAGE.LOGIN, null, fn);
    },
    goIndex: function (fn) {
        var $this = this;
        $this.go(PAGE.INDEX, null, fn);
    },
    reload: function () {
        location.reload()
    },
    go: function (page, parameter, fn) {
        if (page != null) {
            if (fn) fn();
            window.location.href = page + (parameter ? $.param(parameter) : "");
        }
    }
};
function RelationData(parents, childs, key, setKey) {
    $(parents).each(function () {
        var p = this;
        $(childs).each(function (i, c) {
            if (p[key] == c[key]) {
                if (IsNullOrWhiteSpace(p[setKey])) p[setKey] = [];
                p[setKey].push(c);
                childs.splice(i, 1);
            }
        });
    });
    return parents;

}
//发送请求
function Send(procedure, data, fn, sign) {
    var procedureName, parameter;
    switch (procedure) {
        case "login":
            procedureName = "usp_Login";
            parameter = "'" + data.username + "','" + data.password + "'";
            ExecDefault(procedureName, parameter, fn, sign);

        case "getTheme":
            data = data == null ? {} : data;
            data["method"] = procedure;
            $.post("ashx/main.ashx", data,
            function (json) {
                fn(GetResult(json));
            });
            break;
        case "getYuanGongXinXi":
            procedureName = "usp_GetYuangongxinxi";
            parameter = "'" + data.businessUnitId + "','" + data.condition + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;
        case "placeOrder":
            procedureName = "usp_PlaceOrder";
            parameter = "'" + User.info.LoginName + "','" + User.info.Password + "','" + data.customerId + "','" + data.data + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;
        case "getLiaoChengAndChuXiao":
            procedureName = "usp_GetliaochengAndchuxiao";
            PagingRequest(procedureName, data, fn, sign);
            break;
        case "getCustomer":
            procedureName = "usp_GetCustomer";
            PagingRequest(procedureName, data, fn, sign);
            break;
        case "getChanPinAndXiangMu":
            procedureName = "usp_GetchanpinAndxiangmu";
            PagingRequest(procedureName, data, fn, sign);
            break;
        case "getYiYouLiaoCheng":
            procedureName = "usp_Getyongyouliaocheng";
            parameter = "'" + data.customerId + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;
        case "getXiangMuByYuYue":
            procedureName = "usp_GetXiangmuByYuyue";
            parameter = "'" + data.condition + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;
        case "getFangJian":
            procedureName = "usp_GetFangjian";
            parameter = "'" + data.condition + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;
        case "getPrintTickertape":
            procedureName = "usp_GetprintTickertape";
            parameter = "'" + data.xiaofeikdId + "'";
            ExecDefault(procedureName, parameter, fn, sign);
            break;

    }
}

//分页请求
function PagingRequest(procedureName, data, fn, sign) {
    var parameter = "'" + data.pageSize + "','" + data.pageNumber + "','" + data.parameter + "'";
    ExecDefault(procedureName, parameter, fn, sign);
}
//默认形式的发送请求
function ExecDefault(_procedureName, _parameter, _fn, _sign) {
    Exec(_procedureName, _parameter,
           function (json, __sign) {
               _fn(GetResult(json, __sign));
           }, null, null, _sign);
}

function GetTemp_Object(key) {
    return window[key];
}

function SetTemp_Object(obj, key) {
    key = key == null ? GetOnlyId() : key;
    window[key] = obj;
    return key;
}
function GetOnlyId() {
    return new Date().getTime();
}
function IsNullToDefault(value, _default) {
    return value == null ? _default : value;
}
function IsNullOrWhiteSpace(string) {
    if (string == null || string == '' || string == "null") return true;
    else return false;
}
var ExecType = {
    data: 0,
    xlm: 1,
    zip: 2
};
var Loader_Text = "数据处理中...";
var WebService_Url = "http://123.207.36.96:8989/WebService/BaseInfo.asmx/WebExecProcedure";
function GetLoader() {
    var loader = $("#loader");
    if (loader.length == 0) {
        loader = jQuery('<div id="loader" class="ajax-backdrop fade in"><div class="ajax-loading">' + Loader_Text + '</div></div>'); $("body").append(loader);
        $(".ajax-loading", loader).css({
            "left": ((document.documentElement.clientWidth - $(".ajax-loading", loader).outerWidth(true)) / 2) + "px"
        });
        loader.hide();
    }
    return loader;
}
function Exec(procedureName, parameter, fn, type, isLoader, sign) {
    isLoader = isLoader || true;
    var loader = GetLoader();
    if (isLoader) loader.show();
    type = type == null ? ExecType.data : type;
    var url = WebService_Url + "?jsoncallback=?";
    var type_str = "?jsoncallback=?";
    var parameter_str = parameter;
    switch (type) {
        case ExecType.xlm:
            type_str = "Xml";
            parameter_str = XmlData(parameter);
            break;
        case ExecType.zip:
            type_str = "Zip";
            parameter_str = ZipData(parameter);
            break;
        case ExecType.data:
            type_str = "?jsoncallback=?";
            parameter_str = parameter;
            break;
    }
    url = WebService_Url + type_str;
    var data = {
        procedureName: procedureName,
        parameter: parameter_str
    };
    switch (type) {
        case ExecType.xlm:
        case ExecType.zip:
            $.post(url, data,
            function (json) {
                if (isLoader) loader.hide();
                json = "" + json;
                if (fn) fn(eval(json));
            });
            break;
        case ExecType.data:
            $.ajaxSetup({ sign: sign });
            $.getJSON(url, data,
             function (json) {
                 if (isLoader) loader.hide();
                 if (fn) fn(eval(json), this.sign);
             });

            break;
    }

}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,
        //月份
        "d+": this.getDate(),
        //日
        "h+": this.getHours(),
        //小时
        "m+": this.getMinutes(),
        //分
        "s+": this.getSeconds(),
        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function FormatData(k, e, v, a,t) {
    var _callback = $(e).attr("data-format-callback");
    switch (k) {
        case "formatcountdown":
            if (!IsNullOrWhiteSpace(v)) {
                setInterval(function () {
                    $(e).text(getcountdown(v, new Date()))
                },
                1000);
            } else $(e).parent().hide();
            break;
        case "formatprice":
            if ($(e).is("input"))
                $(e).val(TryParseFloat(v).toFixed(2));
             else
                $(e).text(TryParseFloat(v).toFixed(2));
            break;
        case "formatsex":
            $(e).text(parseInt(v) == 2 ? "♀" : "♂");
            break;
        case "formatif":

            $(e).text(parseInt(v) == 1 ? "是" : "否");
            break;
        case "formatisnamed":
            if (parseInt(v) == 1) $(e).removeClass('glyphicon-remove').addClass('glyphicon-ok').text("");
            else $(e).removeClass('glyphicon-ok').addClass('glyphicon-remove').text("");
            break;
        case "formatcommissionpost":
            if (IsNullOrWhiteSpace(v)) {
                $(e).html("<ul><li data-entity='settlement' data-entity-control-name='notselect'>未选择</li></ul>");
            } else {
                $(e).html("<ul><li data-entity='settlement' data-entity-control-name='notselect'>未选择</li></ul>");
                $(v).each(function () {
                    var _this = this;
                    $(_this.servicePersonals).each(function (_i,_e) {
                        if (this.name != "未分配") {
                            $("[data-entity-control-name='notselect']", $(e)).remove();
                            $("ul", $(e)).append("<li>" + this.name + "(" + _this.name + ")</li>");
                        }
                    });
                });
            }
            break;
        case "formatcpdetails":
            var menuid = "cp_dropdownMenu" + GetOnlyId();
            $(e).attr("id", menuid);
            var ul = $("ul", e).attr("aria-labelledby", menuid);
            ItemProductCoursePromotion.fillDetails(ul, v);
            break;
        case "formatcpdetailstype":
            $(e).text(parseInt(v) == 1 ? "项目" : "产品");
            break;
        case "formatclass":
            $(e).text(CLASS[v]);
            break;
        case "formatshortdate":
            $(e).text(new Date(v).Format("yyyy-MM-dd"));
            break;
        case "formatdate":
            var format = $(e).attr("data-date-format") || "yyyy-MM-dd hh:mm";
            $(e).text(new Date(v).Format(format));
            break;
        case "formatecotdetails":
            Customer.ecot.details.init(e, v);
            break;
        case "formatselect":
            $(v).each(function () {
                $(":checkbox", $(e).filter("[data-id='" + this + "']")).prop('checked', true);
            });
            break;
        case "fotmatjoin": //选择服务人员
            var names = [];
            $(v).each(function () {
                names.push(this.name);
            });
            $(e).val(names.join());
            break;
        case "formatentity":
            var _entity = $(e).attr("data-format-entity");
            if (!IsNullOrWhiteSpace(_entity) && !IsNullOrWhiteSpace(window[_entity])) {
                window[_entity].init(null, null, v, e);
            } else {
                if ($(e).is("input"))
                    $(e).val(v.name);
                else
                    $(e).text(v.name);
            }
            break;
        case "formatcalculation":
            var _operation = $(e).attr("data-calculation-operation");
            var _name = $(e).attr("data-calculation-name");
            var _calculation_callback = $(e).attr("data-calculation-callback");
            var _total = $(e).attr("data-calculation-set") || "column";
            var _val = 0;
            switch (_operation) {
                case "count":
                    if (_total == "column") {
                        if (!IsNullOrWhiteSpace(a[_name]))
                            _val = a[_name].length;
                        $(e).text(_val);
                    } else if (_total=="row") {
                        $(t).each(function () {
                            if(!IsNullOrWhiteSpace(this[_name]))
                                _val += this[_name].length;
                            $(e).text(_val);
                        });
                    }
              
                    break;
                case "sum":
                    if (_total == "column") {
                        $(a).each(function () {
                            _val += TryParseFloat(this[_name]);
                        });
                        $(e).text(_val);
                    } else if (_total == "row") {
                        $(t).each(function (_i,_e) {
                            $(_e).each(function () {
                                _val += TryParseFloat(this[_name]);
                            });
                        });
                        $(e).text(_val);
                    }
                    break;
            }
            if (!IsNullOrWhiteSpace(_calculation_callback)) {
                var _event=window[$entity.getTheEntity(e).name][_calculation_callback]||window[_calculation_callback];
                _event(_val,e,a);
            }
            break;
        case "formatpie":
                var config = {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: [],
                            backgroundColor: [],
                            label: 'Dataset'
                        }],
                        labels: []
                    },
                    options: {
                        responsive: true
                    }
                }
                var val = 100 / v.length;
                var colors = [];
                for (var i in chartColors) {
                    colors.push(chartColors[i]);
                }
                var index = 0;
                $(v).each(function () {
                    config.data.datasets[0].data.push(val);
                    if (index > colors.length - 1) index = 0;
                    config.data.datasets[0].backgroundColor.push(colors[index]);
                    config.data.labels.push(this.name);
                    index++;
                });
                if( $(e).siblings().is(".chartjs-hidden-iframe")){
                    var _id = $(e).attr("id");
                    var _configid = $(e).attr("configid");
                    console.log(window[_configid], config)
                    window[_configid] = $.extend(true, window[_configid], config);
                    window[_id].update();
                }else{
                    var _id = GetOnlyId();
                    var _configid = GetOnlyId();
                    $(e).attr({ "id": _id, "configid": _configid });
                    window[_configid] = config;
                    window[_id] = new Chart($(e).get(0).getContext("2d"), config);
                }
            break;
          
    }
    if (!IsNullOrWhiteSpace(_callback)) _callback(k, e, v, a);
}
function getcountdown(fronttime, backtime) {
    var leftTime = fronttime - backtime; //计算剩余的毫秒数
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
    days = checktime(days);
    hours = checktime(hours);
    minutes = checktime(minutes);
    seconds = checktime(seconds);
    return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
}
function checktime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
var $entity = {
    getEntity: function (_entity) {
        if (typeof (_entity) == "string") {
            return window[_entity];
        } else if (typeof (_entity) == "object") {
            window[_entity.name] = $.extend(true, {}, this.entity, _entity);
            return window[_entity.name];
        }

    },
    OPERATION: {
        SUM:"sum"
    },
    TYPE:{
        LIST:"list",
        FORM:"form"
    },
    operation: function (_data,_field, _type) {
        var _val = 0;
        switch (_type) {
            case "sum":
                $(_data).each(function () {
                    _val += TryParseFloat(this[_field]);
                });
                break;
        }
        return _val;
        
    },
    getTheEntity: function (_e) {
        return this.getEntity($(_e).parents("[data-entity]").first().attr("data-entity"));
    },
    entity: {
        name: null,
        type:null,
        parent: "body",
        modal: null,
        content: null,
        thead: null,
        tbody: null,
        list: null,
        form:null,
        collapse: function (_method, _control) {
            switch (_method) {
                case "show":
                    if (!$(".collapse", _control).hasClass("in"))
                        $("a[role='button'][data-toggle='collapse']", _control).click();
                    break;
            }
        },
        getControl: function (_condition, _isId) {
            if (_isId)
                return $("[data-controlid='" + _condition + "']");
            else if (typeof (_condition) == "object") {
                return this.find("[data-CONTROLID='" + _condition.CONTROLID + "']");
            } else return this.find("[data-entity-control-name='" + _condition + "']");
        },
        getTheControl: function (_e) {

            return $(_e).parents("[data-entity='" + this.name + "']").first();
        },
        getFromControl: function (_e) {
            return this.getControl($(_e).getData().FROMCONTROLID, true);
        },
       
        getData: function (_e) {

            if (typeof (_e) == "string") {
                var _data=null;
                if (this.getType() == $entity.TYPE.LIST) {
                 _data = [];
                $(this.response.data).each(function () {
                    _data.push(this[_e]);
                });
                } else if (this.getType() == $entity.TYPE.FORM) {
                    _data = this.response.data[_e];
                }
                return _data;
            } else if (_e) return $(_e).parents("[data-entity='" + this.name + "']").getData();
            else return this.response.data;
        },
        setData: function (_data, _remove) {
            _remove = _remove || false;
            var _this = this;
            var _bool = false;
            if (this.setDataBeginCallback) {
                _data = this.setDataBeginCallback(_data) || this.response.data;
            };
            if (this.getType() == $entity.TYPE.LIST) {
                $(this.response.data).each(function (i, e) {
                    if (e.CONTROLID == _data.CONTROLID) {
                        if (_remove)
                            _this.response.data.splice(i, 1);
                        else
                            _this.response.data[i] = _data;
                        _bool = true;
                        return false;
                    }
                });
                if (!_bool) {
                    if (!_remove) {
                        if (IsNullOrWhiteSpace(this.response.data))
                            this.setResponseData([_data]);
                        this.response.data.push(_data);
                    }
                }
                this.setItem(_data, this.response.data);
                if (_remove)
                    this.getControl(_data).remove();
            } else if (this.getType() == $entity.TYPE.FORM) {
                this.response.data = $.extend(true,this.response.data,_data);
                this.fillForm(_data);
            }
        },
        addData: function (_data, _repeat, _newDataCallback) {
            var _this = this;
            if (_data.CONTROLID) {
                if (!this.existItem("[data-controlid='" + _data.CONTROLID + "']")) delete _data.CONTROLID;
            }
            if (_repeat == true) _repeat = "id";
            if (this.response.data == null) {
                this.response = {
                    result: true,
                    data: [],
                };
            }
            var _is = true;
            if (_repeat) {
                $(this.response.data).each(function (i, e) {
                    if (e[_repeat] == _data[_repeat]) {
                        _is = false;
                        if (_this.addInsertDataBeginCallback) {
                            _data = _this.addInsertDataBeginCallback(_data) || _data;
                        }
                        e = _data;
                    }

                });
            }
            if (_is) this.response.data.push(_data);
            if (this.addDataCallback) this.addDataCallback(this, _data);
        },
        find: function (_condition) {
            return $("[data-entity='" + this.name + "']").filter(_condition);
        },
        exist: function (_controlId) {
            return $("[data-controlid='" + _controlId + "']").length > 0;
        },
        existItem: function (_condition) {
            return this.getItem().filter(_condition) > 0;
        },
        findItem: function (_condition) {
            return this.getItem().filter(_condition);
        },
        getModal: function () {
            if (this.modal == null)
                this.modal = $("[data-entity='" + this.name + "'][data-entity-control='modal']");
            return this.modal;
        },
        getTitle: function () {
            if (this.title == null)
                this.title = $("[data-entity='" + this.name + "'][data-entity-control='title']");
            return this.title;
        },
        getContent: function () {
            if (this.content == null)
                this.content = $("[data-entity='" + this.name + "'][data-entity-control='content']");
            return this.content;
        },
        getThead: function () {
            if (this.thead == null)
                this.thead = $("[data-entity='" + this.name + "'][data-entity-control='thead']");
            return this.thead;
        },
        getTbody: function () {
            if (this.tbody == null)
                this.tbody = $("[data-entity='" + this.name + "'][data-entity-control='tbody']");
            return this.tbody;
        },
        getList: function () {
            this.list = $("[data-entity='" + this.name + "'][data-entity-control='list']", this.parent);
            if (this.list.length == 0)
                this.list = $(this.parent).filter("[data-entity='" + this.name + "'][data-entity-control='list']");
            return this.list;
        },
        getForm: function () {
            this.form = $("[data-entity='" + this.name + "'][data-entity-control='form']", this.parent);
            if (this.form.length == 0)
                this.form = $(this.parent).filter("[data-entity='" + this.name + "'][data-entity-control='form']");
            return this.form;
        },
        getField: function (_field) {
            if(_field)
                return $("[data-name='" + _field + "']", this.getForm());
                else
            return $("[data-name]",this.getForm());
        },
        getType: function () {
            if (this.getList().length > 0)
                this.type = $entity.TYPE.LIST;
            else if (this.getForm().length > 0)
                this.type = $entity.TYPE.FORM;
            return this.type;
        },
        template: function () {
            return $("[data-entity='" + this.name + "'][data-entity-control='template']");
        },
        getTemplate: function () {
            var item = this.template().clone(true);
            item.attr("data-entity-control", "item");
            item.find("[data-entity-control='choice']").bindReplace("click", function (e) {
                var the = $entity.entity.getTheItem(e.target);
                if ($(e.target).is(':checked'))
                    the.addClass("choice");
                else
                    the.removeClass("choice");
            });
            if (this.setTemplate) this.setTemplate(item);
            return item;
        },
        selectChoiceItem: function (_data) {
            var _this = this;
            $(_data).each(function () {
                var the = _this.getItem().filter("[data-id='" + this.id + "']").addClass("choice");
                $("[data-entity-control='choice']", the).prop('checked', true);
            });
        },
        getChoiceItem: function () {
            return this.getItem().filter(".choice");
        },
        getChoiceData: function () {
            var _data = [];
            $(this.getChoiceItem()).each(function () {
                _data.push($(this).getData());
            });
            return _data;
        },
        getTheItem: function (e) {
            return $(e).parents("[data-entity-control='item']").first();
        },
        getTheItemData: function (e) {
            return this.getTheItem(e).getData();
        },
        getItem: function (_data,_all) {
            if (IsNullOrWhiteSpace(_data)) {
                return $("[data-entity='" + this.name + "'][data-entity-control='item']");
            } else {
                var item = this.getTemplate();
                item.fillData(_data, _all);
                if (this.getItemCallback) this.getItemCallback(item, _data, _all);
                return item
            }
        },
        addItem: function (_data,_all) {
            var item = this.getItem(_data, _all);
            var list = this.getList();
            list.append(item);
            if (this.addItemCallback) this.addItemCallback(list, item, _data,_all);
        },
        setItem: function (_data,_all) {
            if (IsNullOrWhiteSpace(_data.CONTROLID)) return false;
            var _item = $("[data-controlid='" + _data.CONTROLID + "']").fillData(_data,_all);
            if (_item.length > 0) {
                if (this.setItemCallback) this.setItemCallback(this.getList(), _item, _data);
                return true
            } else return false;
        },
        fillList: function (_data) {
            for (var i = 0; i < _data.length; i++) {
                this.addItem(_data[i],_data);
            }
            if (this.fillListCallback) this.fillListCallback(this.getList(), _data);
        },
        fillForm: function (_data) {

            this.getForm().fillData(_data);
            if (this.fillFormCallback) this.fillFormCallback(this.getForm(), _data);
        },
   
        refreshList: function (_data) {
            for (var i = 0; i < _data.length; i++) {
                if (!this.setItem(_data[i])) this.addItem(_data[i]);
            }
        },
        //清空
        empty: function () {
            this.getList().find("[data-entity-control='item']").remove();
            this.response = {
                result: null,
                data: null
            }
            if (this.emptyCallback) this.emptyCallback(this.getList());
        },
        //移除
        remove: function (_data) {
            this.setData(_data, true);
        },
        removeTheItem: function (_e) {
            this.remove(this.getTheItemData(_e));
        },
        //刷新
        refresh: function (fn) {
            this.refreshList(this.response.data);
            if (fn) fn(this);
        },
        init: function (_afn, _bfn, _data, _parent) {
            if (!IsNullOrWhiteSpace(_parent))
                this.parent = _parent;
            if (_bfn) this.initBeginCallback = _bfn;
            if (this.initBeginCallback) this.initBeginCallback(this);
            this.empty();
            if (!IsNullOrWhiteSpace(_data))
                this.setResponseData(_data);
            this.load();
            
            if (this.attribute) {
                for (var i = 0; i < this.attribute.length; i++) {
                    var _entity = $entity.getEntity(this.attribute[i].entity);
                    if (_entity) _entity.init();

                }
            }
            if (_afn) this.initCallback = _afn;
            if (this.initCallback) this.initCallback(this);
        },
        setTemplate: null,
        setDataBeginCallback:null,
        addInsertDataBeginCallback: null,
        addDataCallback: null,
        getItemCallback: null,
        addItemCallback: null,
        initBeginCallback: null,
        initCallback: null,
        loadBeginCallback: null,
        fillListCallback: null,
        fillFormCallback:null,
        emptyCallback: null,
        modalShownHandle: null,
        bindEvent: function () {
            if (!IsNullOrWhiteSpace(this.getModal())) {
                var _this = this;
                this.getModal().bindReplace("shown.bs.modal", function (_e) {
                    _this.layout();
                    if (_this.modalShownHandle) _this.modalShownHandle();
                })
            }
            if (this.getType()==$entity.TYPE.FORM) {
                this.getField().bindReplace("keyup", function () {
                    var _name=$(this).attr("data-name");
                    $entity.getTheEntity(this).response.data[_name] = $(this).val();
                });
            }
        },
        loadConfigure: {
            procedureName: null,
            data: null,
            handle: null,
            callback: null
        },
        response: {
            result: null,
            data: null
        },
        setResponseData: function (_data) {
            this.setResponse({
                result: true,
                data: _data,
            });
        },
        setResponse: function (_response) {
            this.response = $.extend({}, this.response, _response);
        },
        getResponse: function () {
            return this.response;
        },
        load: function (_procedureName, _data, _handle, _callback) {
            if (this.loadBeginCallback) this.loadBeginCallback(this, _procedureName, _data, _handle, _callback);
            this.loadConfigure.procedureName = IsNullToDefault(_procedureName, this.loadConfigure.procedureName);
            this.loadConfigure.data = IsNullToDefault(_data, this.loadConfigure.data);
            this.loadConfigure.handle = IsNullToDefault(_handle, this.loadConfigure.handle);
            this.loadConfigure._callback = IsNullToDefault(_callback, this.loadConfigure._callback);
            if (this.response.result == null && this.response.data == null) {
                Send(this.loadConfigure.procedureName, this.loadConfigure.data, function (rs) {
                    $entity.getEntity(rs.sign).response.result = rs.result;
                    $entity.getEntity(rs.sign).response.data = rs.data[0];
                    $entity.getEntity(rs.sign).loadData();
                }, this.name);

            } else this.loadData();
        },
        loadData: function () {
            if (!this.loadConfigure.handle) {
                if (this.response.result) {
                    if (this.getType() == $entity.TYPE.LIST)
                        this.fillList(this.response.data);
                    else if (this.getType() == $entity.TYPE.FORM)
                        this.fillForm(this.response.data);
                }
            }
            else this.loadConfigure.handle(this.response);
            this.bindEvent();
            if (this.loadConfigure.callback) this.loadConfigure.callback(this);
            this.layout();
        },

        queryConfigure: {
            procedureName: null
        },
        query: function (_data) {
            this.empty();
            this.load(null, _data, null);
        },
        queryHandle: function (_e, _p) {
            this.queryConfigure.procedureName = IsNullToDefault(_p, this.queryConfigure.procedureName);
            this.loadConfigure.data[this.queryConfigure.procedureName] = $(_e).val();
            this.query(this.loadConfigure.data);
        },
        openWin: null,
        layout: function () {
            if (!IsNullOrWhiteSpace(this.getModal()) && !IsNullOrWhiteSpace(this.getContent())) {
                this.getContent().setToModalContentMaxHeight();
            }
            if (!IsNullOrWhiteSpace(this.getThead()) && !IsNullOrWhiteSpace(this.getTbody())) {
                layoutTable(this.getThead(), this.getTbody());
            }
        },
        //实体属性
        attribute: null
    }
}


function importData() {
    $("#upload").remove();
    var input = $("<input type='file' id='upload'/>");
    $("body").append(input);
    input.click();
    input.change(function () {
        var formData = new FormData();

        var time = new Date().getTime() + '.xls';
        formData.append("file", $("#upload")[0].files[0]);
        formData.append("SavePath", "D:\\upload");
        formData.append("SaveName", time);
        $.ajax({
            url: "http://139.199.183.24:8079/WebService/BaseInfo.asmx/WebUpload",
            type: 'POST',
            data: formData,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            beforeSend: function () {
                console.log("正在进行，请稍候");
            },
            success: function (json) {
                json = "" + json;
                var data = eval(eval(json));

                if (data.Success) {
                    $("#loade").show();
                    var roleid = CURRENT_USER.systemuserid;
                    var url = "http://139.199.173.100:8078/WebService/BaseInfo.asmx/WebExecProcedure?jsoncallback=?";

                    $.getJSON(url, {
                        procedureName: "usp_ImportZhengshu",
                        parameter: "'" + roleid + "','" + data.Message + "'"
                    }, function (json1) {
                        $("#loade").hide();
                        var data1 = eval(json1);
                        purecms.alert(false, data1.ds[0].Result);
                        rebind();
                    });
                } else {
                    alert("上传失败");
                }
            },
            error: function (responseStr) {
                console.log("error");
            }
        });
    })

}
var testingId;
var testingHandle = {};
var testing = {
    intervalId: null,
    handles: [],
    run: function (_handles, _arguments) {

        if (_handles) this.handles.push({ handle: _handles, arguments: _arguments });
        if (this.handles.length == 0) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                return false;
            }
        } else {
            $(this.handles).each(function (i, e) {

                if (this.handle.apply(this, this.arguments)) {
                    testing.handles.splice(i, 1);
                }
            });
        }
        if (!this.intervalId) {
            this.intervalId = setInterval(function () {
                testing.run();
            }, 100);
        }

    }
}
function layoutTable(h, b) {
    testing.run(layout_table, arguments);
}
function layout_table(h, b) {

    if ($(h).is(":hidden")) return false;

    var ths = $("th", h);
    var h_w = $(h).width();
    var b_w = $(b).width();
    ths.each(function (i, e) {
        var setWidth = $(e).styleToJson()["width"];
        var width = IsNullOrWhiteSpace(setWidth) ? $(e).innerWidth() : parseInt(setWidth.replace("px"));
        var dn = $(e).attr("data-column");
        $("td[data-column='" + dn + "']", $("tr:first", b)).css({
            "max-width": width + "px",
            "min-width": width + "px",
            "width": width + "px"
        });
        if (i == ths.length - 1) {
            width = width - (h_w - b_w);
            $("td[data-column='" + dn + "']", $("tr:first", b)).css({
                "max-width": width + "px",
                "min-width": width + "px",
                "width": width + "px"
            });
        }
    });
    return true;
}
function GetSystemUser() {
    try {
        return JSON.parse($.session.get("user"));
    } catch (ex) {
        return null
    }
}

function TryParseFloat(_a,_b) {
    try {
        return parseFloat(_a);
    } catch (ex) {
        return _b || 0;
    }
}
