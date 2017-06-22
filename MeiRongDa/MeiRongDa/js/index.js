$(function(){
/* 页面运行 */
    // 查询是否web或者ipad端
        function browserRedirect() {
            var sUserAgent= navigator.userAgent.toLowerCase();
            var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp= sUserAgent.match(/midp/i) == "midp";
            var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid= sUserAgent.match(/android/i) == "android";
            var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
            if ( bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                window.location.href= 'getphone.html';
            }
        }
        browserRedirect();
    // 起始页面大小适配屏幕
        $(window).load(function() {
            $('.view').height($(window).height());
            $('.parlor_left').height($(window).height());
            $('.parlor_right').height($(window).height());
            $('.view').width($(window).width());
            $('#mengban').width($(window).width());
            $('#mengban').height($(window).height());
            $('#mengban2').width($(window).width());
            $('#mengban2').height($(window).height());
            $('#mengban3').width($(window).width());
            $('#mengban3').height($(window).height());
            $('.guadan_view').width($(window).width());
            $('.guadan_view').height($(window).height());
            $('.jiesuan_view').width($(window).width());
            $('.jiesuan_view').height($(window).height());
            $('.cuxiao_view').width($(window).width());
            $('.cuxiao_view').height($(window).height());
            $('.shoukuang_view').width($(window).width());
            $('.shoukuang_view').height($(window).height());
            $('.liaocheng_view').width($(window).width());
            $('.liaocheng_view').height($(window).height());
            $('.hasliaocheng_view').width($(window).width());
            $('.hasliaocheng_view').height($(window).height());
            $('.hasmoney_view').width($(window).width());
            $('.hasmoney_view').height($(window).height());
            $('.man_view').width($(window).width());
            $('.man_view').height($(window).height());
            $('.diside_view').width($(window).width());
            $('.diside_view').height($(window).height());
        });
    // 屏幕更改时改变大小适配屏幕
        $(window).resize(function() {
            $('.view').height($(window).height());
            $('.parlor_left').height($(window).height());
            $('.parlor_right').height($(window).height());
            $('.view').width($(window).width());
            $('#mengban').width($(window).width());
            $('#mengban').height($(window).height());
            $('#mengban2').width($(window).width());
            $('#mengban2').height($(window).height());
            $('#mengban3').width($(window).width());
            $('#mengban3').height($(window).height());
            $('.guadan_view').width($(window).width());
            $('.guadan_view').height($(window).height());
            $('.jiesuan_view').width($(window).width());
            $('.jiesuan_view').height($(window).height());
            $('.cuxiao_view').width($(window).width());
            $('.cuxiao_view').height($(window).height());
            $('.shoukuang_view').width($(window).width());
            $('.shoukuang_view').height($(window).height());
            $('.liaocheng_view').width($(window).width());
            $('.liaocheng_view').height($(window).height());
            $('.hasliaocheng_view').width($(window).width());
            $('.hasliaocheng_view').height($(window).height());
            $('.hasmoney_view').width($(window).width());
            $('.hasmoney_view').height($(window).height());
            $('.man_view').width($(window).width());
            $('.man_view').height($(window).height());
            $('.diside_view').width($(window).width());
            $('.diside_view').height($(window).height());
        })

    //假数据
    //促销页面
    var cuxiao = [{ ID: 'D00001', Name: '面部疗程', Num: '1', Money:'1000' , childs:[{child_Id: 'D_001', child_Name: '洗脸', child_Num: '10', child_Money:'500'},{child_Id: 'D_002', child_Name: '拉皮', child_Num: '10', child_Money:'500'}],time:'2017-06-10 0:0:0'},{ ID: 'D00002', Name: '手部疗程', Num: '1', Money:'888' , childs:[{child_Id: 'D_003', child_Name: '按摩', child_Num: '10', child_Money:'444'},{child_Id: 'D_004', child_Name: '松骨', child_Num: '10', child_Money:'444'}],time:'2018-06-10 0:0:0'}];
    $('#Cuxiao_item').tmpl(cuxiao).appendTo('.cuxiao_box');
    //疗程页面
    var liaocheng = [{ ID: 'C00001', Name: '面部疗程', Num: '1', Money:'1000' , childs:[{child_Id: 'C_001', child_Name: '洗脸', child_Num: '10', child_Money:'500'},{child_Id: 'C_002', child_Name: '拉皮', child_Num: '10', child_Money:'500'}],time:'2017-06-10 0:0:0'},{ ID: 'C00002', Name: '手部疗程', Num: '1', Money:'888' , childs:[{child_Id: 'C_003', child_Name: '按摩', child_Num: '8', child_Money:'444'},{child_Id: 'C_004', child_Name: '松骨', child_Num: '4', child_Money:'444'}],time:'2018-01-1 0:0:0'}];
    $('#liaocheng_item').tmpl(liaocheng).appendTo('.liaocheng_box');
    //已有疗程
    var hasliaocheng = [{ ID: 'E00001', Name: '面部疗程', Num: '1', Money:'1000' , childs:[{child_Id: 'E_001', child_Name: '洗脸', child_Num: '10', child_Money:'500'},{child_Id: 'E_002', child_Name: '拉皮', child_Num: '10', child_Money:'500'}],time:'2017-12-31'},{ ID: 'E00002', Name: '手部疗程', Num: '1', Money:'888' , childs:[{child_Id: 'E_003', child_Name: '按摩', child_Num: '8', child_Money:'444'},{child_Id: 'E_004', child_Name: '松骨', child_Num: '4', child_Money:'444'}],time:'2017-12-31'}];
    $('#hasliaocheng_item').tmpl(hasliaocheng).appendTo('.hasliaocheng_box');
    //已有订金
    var hasmoney = [{ ID: 'F001', Name: '面部疗程', Num: '1', Money:'50' ,wholeMoney:'50',Received:'10',Uncollected:'40'},{ ID: 'F002', Name: '手部疗程', Num: '1', Money:'100' ,wholeMoney:'100',Received:'10',Uncollected:'90'}];
    $('#hasmoney_item').tmpl(hasmoney).appendTo('.hasmoney_box');
    //服务人员
    var man = [{ ID: '001', Name: '杨幂', Profession: '美疗师'},{ ID: '002', Name: '古天乐', Profession: '按摩师'},{ ID: '003', Name: '霸天虎', Profession: '按摩师'},{ ID: '004', Name: '擎天柱', Profession: '按摩师'},{ ID: '005', Name: '柳岩', Profession: '美疗师'}];
    $('#man_item').tmpl(man).appendTo('.man_box');
/* 公共事件 */
    // 返回首页
        $('.returnView').click(function(){
            $(this).parents('.dd').hide();
            $('.parlor_left').show();
            $('.parlor_right').show();
        });
    // 蒙板点击
        $('#mengban2').click(function(){
            $('#mengban2').toggle();
            $('.yuyue_box').hide();
        });
/* 页面跳转 */
    // 疗程页面
        $('.liaochengbox').click(function(){
            $('.liaocheng_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
        });
    // 促销页面
        $('.cuxiaobox').click(function(){
            $('.cuxiao_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
        });
    // 已有疗程页面
        $('.hasliaochengbox').click(function(){
            $('.hasliaocheng_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
        });
    // 已有订金页面
        $('.hasmoneybox').click(function(){
            $('.hasmoney_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
        });
    // 预约页面
        $('.yuyue').click(function(){
            $('.mengban').hide();
            $('.diside_top').show();
            $('.diside_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
            $('.talkbox').hide();
        });
    // 挂单页
        $('.guadansearch').click(function(){
            $('.guadan_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
        });
/* 首页 */
    // 首页——右侧的商品选择事件
        $('.viewserch li').click(function(){
            $('.checkbod').removeClass('checkbod');
            $(this).addClass('checkbod');
            var shopNum = $(this).find('.shopNum').text();
            var shopName = $(this).find('.shopName').text();
            var shopPrice = $(this).find('.shopPrice').text();
            var shopSafe = $(this).find('.shopSafe').text();
            $('.parlor_left').find('ul').append('<li><p class="licolor shopType">1</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><img src="images/bin.png" class="bin"><div><div class="model"><span class="remove">-</span><span class="numb">1</span><span class="add">+</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">100</span><span class="liviewsum">￥<d class="dollor">'+shopPrice+'</d></span></div></li>');
        });
    // 首页——左侧右上角的预约生日结束点击事件
        $('.fenlei').click(function(){
            $('.fenlei').css('z-index','999');
            $('.talkbox').toggle();
            $('#mengban').toggle();
        });
    // 首页——结算按钮的点击，显示弹出框
        $('.jiesuan').click(function(){
            if($('.lview').find('li').length>0){
                $('.accountView').toggle();
                $('#mengban').toggle();
            }
        })
    // 首页——隐藏弹出框
        $('.removeclose').click(function(){
            $('.accountView').hide();
            $('.removeView').hide();
            $('#mengban').hide();
            $('.peopleView').hide();
        })
    // 首页——购物车的垃圾桶按钮，点击删除选中的商品
        $('.lview').on('click','.bin',function(){
            $('.this').removeClass('this');
            $(this).addClass('this');
            $('.removeView').toggle();
            $('#mengban').toggle();
        })
    // 首页——弹出框的确认删除商品
        $('.removeenter').click(function(){
            $('.this').parent('li').remove();
            $('.removeView').hide();
            $('#mengban').hide();
        })
    // 首页——左侧购物车商品的选择事件
        $('.lview').on('click','li',function(){
            $('.checked').removeClass('checked');
            $('.linumcol').removeClass('linumcol');
            $('.lview li').find('p').addClass('licolor');
            $(this).addClass("checked");
            $(this).find('p').removeClass('licolor').addClass('linumcol');
        })
    // 首页——左侧商品的数字 减法
        $('.lview').on('click','.remove',function(){
            if($(this).next('span').text()==1){
                $(this).next('span').text(1);
            }else{
                var num = parseInt($(this).next('span').text());
                num--;
                $(this).next('span').text(num);
                var dd = $('.remove').index(this);
                var dollor = parseInt($('.mdollor').eq(dd).text());
                var money = dollor*num;
                $('.dollor').eq(dd).text(money);
            }
        })
    // 首页——左侧商品的数字 加法
        $('.lview').on('click','.add',function(){
            var num = parseInt($(this).prev('span').text());
            num++;
            $(this).prev('span').text(num);
            var dd = $('.add').index(this);
            var dollor = parseInt($('.mdollor').eq(dd).text());
            var money = dollor*num;
            $('.dollor').eq(dd).text(money);
        });
    // 首页——热门关键词的查询
        $('.rmgjc>div').click(function(){
            $('.checkbox').removeClass('checkbox');
            $(this).addClass('checkbox');
        })
    // 首页——首页右侧 table切换消费开单
        $('.moneyview').click(function(){
            $('.titlecheck').removeClass("titlecheck");
            $(this).addClass('titlecheck');
            $('.rtcenter').eq(0).show();
            $('.rtcenter').eq(1).hide();
        })
    // 首页——首页右侧 table切换订金
        $('.deposit').click(function(){
            $('.titlecheck').removeClass("titlecheck");
            $(this).addClass('titlecheck');
            $('.rtcenter').eq(1).show();
            $('.rtcenter').eq(0).hide();
        })
    // 首页——项目和产品的相互切换
        $('.l_xiangmu').click(function(){
            $('.xiangmu').show();
            $('.chanpin').hide();
        })
        $('.l_chanpin').click(function(){
            $('.xiangmu').hide();
            $('.chanpin').show();
        })
    // 首页——保存商品清单到挂单页
        $('.guadan').click(function(){
            if($('.lview').find('li').length>0){
                var time = new Date();
                var m = time.getMonth() + 1;
                var t = time.getFullYear() + "-" + m + "-"
                    + time.getDate() + " " + time.getHours() + ":"
                    + time.getMinutes() + ":" + time.getSeconds();

                var customerNum = $('.customerNum').text();
                var customerName = $('.customerName').text();
                $('.guadan_box').append('<tr><td class="guadan_c_1"><span>'+customerNum+'</span></td><td class="guadan_c_2"><span>'+customerName+'</span></td><td class="guadan_c_3"><span>'+t+'</span></td><td class="guadan_c_4 cblue"><span><a class="guadan_look">查看</a><a style="margin:0 10px;">/</a><a class="guadan_choose">选择</a></span></td></tr><tr style="display:none;" class="guadan_text guadan_class"></tr>')
            }
            $('.lview li').each(function(){
                var shopType = $(this).find('.shopType').text();
                var shopNum = $(this).find('.shopNum').text();
                var shopName = $(this).find('.shopName').text();
                var shopCount = $(this).find('.numb').text();
                var shopPrice = $(this).find('.mdollor').text();
                var shopSafe = $(this).find('.liviewsafe').text();
                var money = shopCount*shopPrice;
                $('.guadan_class').append('<li><p class="licolor shopType">'+shopType+'</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><div><div class="model"><span class="numb">'+shopCount+'</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">'+shopSafe+'</span><span class="liviewsum">￥<d class="dollor">'+money+'</d></span></div></li>')
            })
            $('.guadan_class').removeClass('guadan_class');
            $('.lview').html('');
        })
    // 首页——结算弹出框的确定按钮点击事件
        $('.accountenter').click(function(){
            $('.jiesuan_box').html('');
            $('.accountView').hide();
            $('.mengban').hide();
            $('.jiesuan_view').show();
            $('.parlor_left').hide();
            $('.parlor_right').hide();
            $('.lview li').each(function(){
                var shopType = $(this).find('.shopType').text();
                var shopNum = $(this).find('.shopNum').text();
                var shopName = $(this).find('.shopName').text();
                var shopCount = $(this).find('.numb').text();
                var shopPrice = $(this).find('.mdollor').text();
                var shopSafe = $(this).find('.liviewsafe').text();
                var shopMoney = $(this).find('.dollor').text();
                $('.jiesuan_box').append('<tr><td class="jiesuan_c_1"><span>'+shopName+'</span></td><td class="jiesuan_c_2"><span>'+shopCount+'</span></td><td class="jiesuan_c_7"><span>'+shopPrice+'</span></td><td class="jiesuan_c_8"><span>'+shopSafe+'%</span></td><td class="jiesuan_c_3"><span>'+shopMoney+'</span></td><td class="jiesuan_c_4"><span class="cblue pointer seriverPeople"><span class="seriverClick"> >> </span><d></d></span></td><td class="jiesuan_c_5"><span class="cblue pointer jiesuan_money"><span class="moneyClick"> >> </span><d></d></span></td><td class="jiesuan_c_6"><span>结账</span></td></tr>')
            })
            $('.lview').html('');
        })
/* 挂单清单 */
    // 挂单——查看按钮的点击功能
        $(".guadan_box").on('click','.guadan_look',function(){
            $('#mengban2').toggle();
            $('.yuyue_box').show();
            var num = $(this).index();
            var txt = $(this).parents('tr:first').next('tr').find('li').clone();
            $('.yuyue_lview').html(txt);
            $('.yuyue_lview').find('ul').show();
        })
    // 挂单——选择按钮的点击功能
        $(".guadan_box").on('click','.guadan_choose',function(){
            $('.guadan_view').hide();
            $('.parlor_left').show();
            $('.parlor_right').show();
            $('.lview').html('');
            var ace = $(this).parents('tr:first').next('tr').find('li');
            ace.each(function(){
                var shopType = $(this).find('.shopType').text();
                var shopNum = $(this).find('.shopNum').text();
                var shopName = $(this).find('.shopName').text();
                var shopCount = $(this).find('.numb').text();
                var shopPrice = $(this).find('.mdollor').text();
                var shopSafe = $(this).find('.liviewsafe').text();
                var shopDollor = $(this).find('.dollor').text();
                $('.parlor_left').find('ul').append('<li><p class="licolor shopType">1</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><img src="images/bin.png" class="bin"><div><div class="model"><span class="remove">-</span><span class="numb">'+shopCount+'</span><span class="add">+</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">100</span><span class="liviewsum">￥<d class="dollor">'+shopPrice+'</d></span></div></li>');
            })

            $(this).parents('tr:first').next('tr').remove();
            $(this).parents('tr:first').remove();
        })
/* 结算清单 */
    // 结算——结算页服务人员选择
        $('.jiesuan_box').on('click','.seriverClick',function(){
            $('.man_view').show();
            $('.jiesuan_view').hide();
            $('.click_people').removeClass("click_people");
            $(this).addClass('click_people')
            $(this).parent('.seriverPeople').find('d').html('');
        })
    // 结算——结算页付款方式选择
        $('.jiesuan_box').on('click','.moneyClick',function(){
            $('.shoukuang_view').show();
            $('.jiesuan_view').hide();
            $('.click_money').removeClass('click_money');
            $(this).addClass('click_money');
            $('.click_money').next('d').html('');

            $('.shoukuang_box').find('input').val(0);
            var money = $(this).parents('tr:first').find('.jiesuan_c_3 span').text();
            $('.shoukuang_box').find('.shoukuang_c_1').html(money);
        })
    // 结算——结算页结账功能点击判断服务员是否选择
        $('.jiesuan_box').on('click','.jiesuan_c_6 span',function(){
            if($(this).parents('tr:first').find('.seriverPeople').find('h').length==0){
                $('.peopleView').show();
                $('.mengban').show();
            }
        })
    // 结算——不选服务人员框弹出的确认事件
        $('.peopleenter').click(function(){
            $('.peopleView').hide();
            $('.mengban').hide();
        })
/* 促销列表 */
    // 促销——促销页加号和减号的切换及相关功能
        $('.cuxiao_c_1 span').bind('click',function(){
            $(this).parents('tr').nextUntil('.cuxiao_father').fadeToggle("");
            if($(this).text()=="+"){
                $(this).text('-');
            }else{
                $(this).text('+');
            }
            return false;
        })
    // 促销——促销页项目的选择
        $('.cuxiao_c_3').click(function(){
            if($(this).find('div').length == 0){
                $(this).addClass('cuxiao_click');
                $(this).append('<div><img src="images/true.jpg" alt="" /></div>')
            }else{
                $(this).removeClass('cuxiao_click');
                $(this).find('div').remove();
            }
        })
    // 促销——促销页确认按钮的点击事件
        $('#cuxiaobtn').click(function(){
            if($('.cuxiao_view').find('.cuxiao_click').length >0){
                $('.cuxiao_click').each(function(){
                    var shopNum = $(this).parent('tr').find('.cuxiao_c_2').find('span').text();
                    var shopName = $(this).find('span').text();
                    var shopPrice = $(this).parent('tr').find('.cuxiao_c_5').find('span').text();
                    $('.parlor_left').find('ul').append('<li><p class="licolor shopType">3</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><img src="images/bin.png" class="bin"><div><div class="model"><span class="remove">-</span><span class="numb">1</span><span class="add">+</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">100</span><span class="liviewsum">￥<d class="dollor">'+shopPrice+'</d></span></div></li>');
                })
            }
            $('.cuxiao_view').hide();
            $('.parlor_left').show();
            $('.parlor_right').show();
        })
/* 疗程列表 */

    // 疗程——疗程页加号和减号的切换及相关功能
        $('.liaocheng_c_1 span').bind('click',function(){
            $(this).parents('tr').nextUntil('.liaocheng_father').fadeToggle("");
            if($(this).text()=="+"){
                $(this).text('-');
            }else{
                $(this).text('+');
            }
            return false;
        })
    // 疗程——疗程页项目的选择
        $('.liaocheng_c_3').click(function(){
            if($(this).find('div').length == 0){
                $(this).addClass('liaocheng_click');
                $(this).append('<div><img src="images/true.jpg" alt="" /></div>')
            }else{
                $(this).removeClass('liaocheng_click');
                $(this).find('div').remove();
            }
        })
    // 疗程——疗程页确认按钮的点击事件
        $('#liaochengbtn').click(function(){
            if($('.liaocheng_view').find('.liaocheng_click').length >0){
                $('.liaocheng_click').each(function(){
                    var shopNum = $(this).parent('tr').find('.liaocheng_c_2').find('span').text();
                    var shopName = $(this).find('span').text();
                    var shopPrice = $(this).parent('tr').find('.liaocheng_c_5').find('span').text();
                    $('.parlor_left').find('ul').append('<li><p class="licolor shopType">3</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><img src="images/bin.png" class="bin"><div><div class="model"><span class="remove">-</span><span class="numb">1</span><span class="add">+</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">100</span><span class="liviewsum">￥<d class="dollor">'+shopPrice+'</d></span></div></li>');
                })
            }
            $('.liaocheng_view').hide();
            $('.parlor_left').show();
            $('.parlor_right').show();
        })
    // 疗程——倒计时
        updateEndTime();
/* 已有疗程 */
    // 已有疗程——已有疗程页加号和减号的切换及相关功能
        $('.hasliaocheng_c_1 span').bind('click',function(){
            $(this).parents('tr').nextUntil('.hasliaocheng_father').fadeToggle("");
            if($(this).text()=="+"){
                $(this).text('-');
            }else{
                $(this).text('+');
            }
            return false;
        })
    // 已有疗程——已有疗程页项目的选择
        $('.hasliaocheng_box').on('click','.hasliaocheng_p_2',function(){
            if($(this).find('div').length>0){
                $(this).find('div').remove();
                $(this).removeClass('hasliaocheng_Click');
            }else{
                $(this).addClass('hasliaocheng_Click');
                $(this).append('<div><img src="images/true.jpg" alt="" /></div>');
            }
        })
    // 已有疗程——已有疗程页确认按钮的点击事件
        $('#hasliaochengbtn').click(function(){
            $('.hasliaocheng_view').hide();
            $('.parlor_left').show();
            $('.parlor_right').show();
            $('.hasliaocheng_Click').each(function(){
                var shopNum = $(this).prev('.hasliaocheng_p_1').find('span').text();
                var shopName = $(this).find('span').text();
                var shopPrice = $(this).next('.hasliaocheng_p_3').find('span').text();
                $('.parlor_left').find('ul').append('<li><p class="licolor shopType">1</p><span><span class="shopName">'+shopName+'</span>(<span class="shopNum">'+shopNum+'</span>)</span><img src="images/bin.png" class="bin"><div><div class="model"><span class="remove">-</span><span class="numb">1</span><span class="add">+</span></div><span class="liviewmoney">￥<d class="mdollor">'+shopPrice+'</d></span><span class="liviewsafe">100%</span><span class="liviewsum">￥<d class="dollor">'+shopPrice+'</d></span></div></li>');
            })
        })
/* 已有订金 */
    // 已有订金——已有订金页的续收功能
        $('.hasmoney_box').on('click','.hasmoney_xushou',function(){
            $('.jiesuan_view').show();
            $('.hasmoney_view').hide();
            $('.jiesuan_box').html('');
            var money = $(this).parents('tr').find('.hasmoney_c_7').find('span').text();
            var name = $(this).parents('tr').find('.hasmoney_c_2').find('span').text();
            console.log(money);
            console.log(name);
            $('.jiesuan_box').append('<tr><td class="jiesuan_c_1"><span>'+name+'</span></td><td class="jiesuan_c_2"><span>1</span></td><td class="jiesuan_c_7"><span>'+money+'</span></td><td class="jiesuan_c_8">100%<span></span></td><td class="jiesuan_c_3"><span>'+money+'</span></td><td class="jiesuan_c_4"><span class="cblue pointer seriverPeople"><span class="seriverClick"> >> </span><d></d></span></td><td class="jiesuan_c_5"><span class="cblue pointer jiesuan_money"><span class="moneyClick"> >> </span><d></d></span></td><td class="jiesuan_c_6"><span>结账</span></td></tr>')
        })
/* 收款单 */
    // 收款——收款页面的确认按钮点击事件
        $('#shoukuanbtn').click(function(){
            if($('.remove_chuzhi').val()>0||$('.remove_ka').val()>0||$('.remove_dingjin').val()>0){
                $('#mengban').show();
                $('.shoukuan_choosebox').show();
            }else{
                $('#mengban').hide();
            }
            if($('.remove_xianjin').val()>0){
                if($('.remove_chuzhi').val()>0||$('.remove_ka').val()>0||$('.remove_dingjin').val()>0){
                    $('#mengban').show();
                    $('.shoukuan_choosebox').show();
                }else{
                    $('.shoukuan_choosebox').hide();
                    $('.shoukuang_view').hide();
                    $('.jiesuan_view').show();
                    $('#mengban').hide();
                }
                $('.click_money').next('d').html('');
                var name = $('.shoukuang_center').find('.shoukuang_c_2').text();
                var txt= $('.remove_xianjin').val();
                $('.click_money').next('d').append('<h><span>'+name+'</span>=<span>'+txt+'</span></h><br/>')
            }
            if($('.remove_yinlianka').val()>0){
                if($('.remove_chuzhi').val()>0||$('.remove_ka').val()>0||$('.remove_dingjin').val()>0){
                    $('#mengban').show();
                    $('.shoukuan_choosebox').show();
                }else{
                    $('.shoukuan_choosebox').hide();
                    $('.shoukuang_view').hide();
                    $('.jiesuan_view').show();
                    $('#mengban').hide();
                }
                $('.click_money').next('d').html('');
                var name = $('.shoukuang_center').find('.shoukuang_c_3').text();
                var txt= $('.remove_yinlianka').val();
                $('.click_money').next('d').append('<h><span>'+name+'</span>=<span>'+txt+'</span></h><br/>')
            }
            if($('.remove_weixin').val()>0){
                if($('.remove_chuzhi').val()>0||$('.remove_ka').val()>0||$('.remove_dingjin').val()>0){
                    $('#mengban').show();
                    $('.shoukuan_choosebox').show();
                }else{
                    $('.shoukuan_choosebox').hide();
                    $('.shoukuang_view').hide();
                    $('.jiesuan_view').show();
                    $('#mengban').hide();
                }
                $('.click_money').next('d').html('');
                var name = $('.shoukuang_center').find('.shoukuang_c_7').text();
                var txt= $('.remove_weixin').val();
                $('.click_money').next('d').append('<h><span>'+name+'</span>=<span>'+txt+'</span></h><br/>')
            }
            if($('.remove_zhifubao').val()>0){
                if($('.remove_chuzhi').val()>0||$('.remove_ka').val()>0||$('.remove_dingjin').val()>0){
                    $('#mengban').show();
                    $('.shoukuan_choosebox').show();
                }else{
                    $('.shoukuan_choosebox').hide();
                    $('.shoukuang_view').hide();
                    $('.jiesuan_view').show();
                    $('#mengban').hide();
                }
                $('.click_money').next('d').html('');
                var name = $('.shoukuang_center').find('.shoukuang_c_8').text();
                var txt= $('.remove_zhifubao').val();
                $('.click_money').next('d').append('<h><span>'+name+'</span>=<span>'+txt+'</span></h><br/>')
            }
            if($('.jiesuan_money d').find('h').length > 0){
                $('.jiesuan_money>span').css({'position':'absolute','left':'10px','bottom':'10px'});
            }else{
                $('.jiesuan_money>span').css({'position':'','left':'','bottom':''});
            }
        })
    // 收款——验证方法选择框的选择及其事件
        $('.shoukuan_choosebox input').click(function(){
            $('.pink').css({'color':'#000','border':'1px solid #ccc'});
            $('.pink').removeClass('pink');
            $(this).addClass('pink');
            $(this).css({'color':'#ff88ae','border':'1px solid #ff88ae'});
        })
    // 收款——收款框的关闭事件
        $('.shoukuan_choosebox>p').click(function(){
            $('.mengban').hide();
            $('.shoukuan_choosebox').hide();
        })
    // 收款——密码验证框的显示
        $('#shoukuan_choosebox_password').click(function(){
            $('.shoukuan_passwordbox').show();
        })
    // 收款——密码验证框的隐藏
        $('.shoukuan_passwordbox>p').click(function(){
            $('.shoukuan_passwordbox').hide();
        })
    // 收款——密码验证框的确认判定事件
        $('#shoukuan_passwordbox_enter').click(function(){
            $('.shoukuan_passwordbox').hide();
        })
    // 收款——短信验证框的显示
        $('#shoukuan_choosebox_mail').click(function(){
            $('.shoukuan_mailbox').show();
        })
    // 收款——短信验证框的影藏
        $('.shoukuan_mailbox>p').click(function(){
            $('.shoukuan_mailbox').hide();
        })
    // 收款——短信验证框的确认判定事件
        $('#shoukuan_mailbox_enter').click(function(){
            $('.shoukuan_mailbox').hide();
        })
    // 收款——短信验证框的显示
        $('#shoukuan_choosebox_fingerprint').click(function(){
            $('#mengban3').show();
            $('.shoukuan_fingerprintbox').show();
        })
    // 收款——指纹验证框的隐藏
        $('.shoukuan_fingerprintbox>p').click(function(){
            $('#mengban3').hide();
            $('.shoukuan_fingerprintbox').hide();
        })
    // 收款——控制输入框输入失去焦点时为空或者格式错误时的数字显示
        $(".shoukuang_box").find('input').blur(function() {
            if($(this).val()==''||$(this).val()<0){
                $(this).val(0);
            }
        });
    // 收款——输入框获得焦点时的格式改变
        $(".shoukuang_box").find('input').focus(function() {
            $(this).val('');
        });
/* 人员列表 */
    // 人员——人员页面人员的选择以及判断百分比的功能
        $('.mancheckbox').click(function(){
            var aa = $(this).parents('tr:first').find('.man_c_1 span').text();
            var bb = $(this).parents('tr:first').find('.man_c_2 span').text();
            var cc = $(this).parents('tr:first').find('.man_c_3 span').text();
            if($(this).attr('src')=='images/checkbox.jpg'){
                $(this).addClass('mancheckbox_true');
                $(this).attr('src','images/checkbox2.jpg');
                $('.man_box_choose').append('<tr><td class="man_c_5"><span>'+aa+'</span></td><td class="man_c_6"><span>'+bb+'</span></td><td class="man_c_7"><span>'+cc+'</span></td><td class="man_c_8"><span>100%</span></td></tr>');
            }else{
                $(this).removeClass('mancheckbox_true');
                $(this).attr('src','images/checkbox.jpg');
                var num = $(this).parents('tr:first').find('.man_c_1 span').text();
                $('.man_box_choose tr').each(function(){
                    if($(this).find('.man_c_5 span').text()==num){
                        $(this).remove();
                    }
                })
            }
            var num = 0;
            $('.man_c_7').each(function(){
                var aa = $(this).text();
                if(aa == cc){
                    num=num +1;
                    var number = parseInt((1/num)*100)+'%';
                    $('.man_c_7').each(function(){
                        var aa = $(this).text();
                        if(aa == cc){
                            $(this).next('.man_c_8').find('span').text(number);
                        }
                    })
                }
            })
            if($('.man_box_choose').find('tr').length > 0){
                $('.manchoose_box').show();
                $('.man_box_choose').css('display','inline-table');
                $('.man_center_choose').css('display','inline-table');
            }else{
                $('.manchoose_box').hide();
                $('.man_box_choose').hide();
                $('.man_center_choose').hide();
            }
        })
    // 人员——人员页面确认按钮的点击事件
        $('#manbtn').click(function(){
            $('.man_view').hide();
            $('.jiesuan_view').show();
            $('.man_box_choose tr').each(function(){
                if($(this).find('.man_c_6').hasClass('dianming')){
                    var name = $(this).find('.man_c_6 span').text();
                    var safe = $(this).find('.man_c_8 span').text();
                    $('.click_people').next('d').append('<h><span class="dianming">'+name+'</span>=<span>'+safe+'</span></h><br/>')
                }else{
                    var name = $(this).find('.man_c_6 span').text();
                    var safe = $(this).find('.man_c_8 span').text();
                    $('.click_people').next('d').append('<h><span>'+name+'</span>=<span>'+safe+'</span></h><br/>')
                }
            })
            if($('.seriverPeople d').find('h').length > 0){
                $('.seriverPeople>span').css({'position':'absolute','left':'10px','bottom':'10px'});
            }else{
                $('.seriverPeople>span').css({'position':'','left':'','bottom':''});
            }
        })
    // 人员——指定服务员的选择功能
        $('.man_box_choose').on('click','.man_c_6',function(){
            if($(this).hasClass('dianming')){
                $(this).removeClass("dianming");
            }else{
                $(this).addClass('dianming');
            }
        })
/* 预约清单 */
    // 预约——预约弹出框疗程列表里的加减切换
      $('.diside_click').click(function(){
            if($(this).text()=='+'){
                $(this).text('-');
                $(this).parents('.diside_big').nextUntil($('.diside_big'),'tr').show();
            }else{
                $(this).text('+');
                $(this).parents('.diside_big').nextUntil($('.diside_big'),'tr').hide();
            }
        })
    // 预约——项目列表和已有疗程的切换
        $('.diside_new_tablehead>div').click(function(){
            $('.thisdiside').removeClass('thisdiside');
            $(this).addClass("thisdiside");
            if($(this).text()=="项目列表"){
                $('.diside_xiangmubox').show();
                $('.diside_liaochengbox').hide();
            }else{
                $('.diside_xiangmubox').hide();
                $('.diside_liaochengbox').show();
            }
        })
    // 预约——关闭预约弹出框
        $('.close').click(function(){
            $('.diside_new').hide();
            $('.diside_qiandao').hide();
            $('.mengban3').hide();
        })
    // 预约——房间号输入框失去焦点事件
        $('#logintxt').blur(function(){
            if($(this).val()==''){
                $(this).css('border-bottom','1px solid #c0c0c0');
            }else{
                $(this).css('border-bottom','none');
            }
        })
    // 预约——房间号输入框获取焦点事件
        $('#logintxt').focus(function(){
            $(this).css('border-bottom','1px solid #c0c0c0');
        })
    // 预约——结束时间输入框失去焦点事件
        $('#endtime').blur(function(){
            if($(this).val()==''){
                $(this).css('border-bottom','1px solid #c0c0c0');
            }else{
                $(this).css('border-bottom','none');
            }
        })
    // 预约——结束时间输入框获取焦点事件
        $('#endtime').focus(function(){
            $(this).css('border-bottom','1px solid #c0c0c0');
        })
    // 预约——服务人员输入框失去焦点事件
        $('.servicepeople').blur(function(){
            if($(this).val()==''){
                $(this).css('border-bottom','1px solid #c0c0c0');
            }else{
                $(this).css('border-bottom','none');
                $('.manchoose').show();
            }
        })
    // 预约——服务人员输入框获得焦点事件
        $('.servicepeople').focus(function(){
            $('.manchoose').show();
            $(this).css('border-bottom','1px solid #c0c0c0');
        })
    // 预约——预约弹出框项目列表里的选择事件
        $('.diside_big').on('click','.xiangmu_t_2',function(){
            var txt = $(this).next('td').text();
            $('.serviceview').hide();
            var view = '<span style="margin-right:10px " class="pipei_one" >'+txt+'</span><d style="margin-right:10px"><img src="images/bin2.jpg" class="removespan" style="height: 100%;"/></d>'
            $('.serviceview').parent('span').append(view);
            $(this).css('border','none')
            $(this).append('<div><img src="images/true.jpg" alt="" /></div>')
            $(this).removeClass('xiangmu_t_2').addClass('xiangmu_t_3')
        })
    // 预约——预约弹出框已有疗程里的选择事件
        $('.diside_child').on('click','.liaocheng_td_2',function(){
            var txt = $(this).text();
            $('.serviceview').hide();
            var view = '<span style="margin-right:10px " class="pipei_two" >'+txt+'</span><d style="margin-right:10px"><img src="images/bin2.jpg" class="removespan" style="height: 100%;"/></d>'
            $('.serviceview').parent('span').append(view);
            $(this).css('border','none')
            $(this).append('<div><img src="images/true.jpg" alt="" /></div>')
            $(this).removeClass('liaocheng_td_2').addClass('liaocheng_td_3')
        })
    // 预约——预约弹出框服务人员输入栏输入编号匹配姓名
        $('.serpeo_click').click(function(){
            $('.servicepeople').parent('span').show();
        })
    // 预约——预约弹出框服务项目里的选项删除事件
        $('.project').on('click','.removespan',function(){
            if($(this).parents('d').prev('span').attr('class')=='pipei_one'){
                var txt = $(this).parent('d').prev('span').text();
                $(this).parent('d').prev('span').remove();
                $(this).parent('d').remove();
                if($('.project').find('span').length==0){
                    $('#serviceview').show();
                }
                if($('.project').has('span')){
                        $('.xiangmu_t_3').each(function(){
                        var txt2 = $(this).text();
                        if(txt==txt2){
                            $(this).prev('td').find('div').remove();
                            $(this).prev('td').removeClass('xiangmu_t_3').addClass('xiangmu_t_2');
                            $(this).prev('td').css('border','0.5px solid #7f7f7f');
                        }
                    });
                }else{
                    $('#serviceview').show();
                        $('.xiangmu_td_3').each(function(){
                        var txt2 = $(this).text();
                        if(txt==txt2){
                            $(this).prev('td').find('div').remove();
                            $(this).prev('td').removeClass('xiangmu_td_3').addClass('xiangmu_td_2');
                            $(this).prev('td').css('border','0.5px solid #7f7f7f');
                        }
                    });
                }
            }else{
                var txt = $(this).parent('d').prev('span').text();
                $(this).parent('d').prev('span').remove();
                $(this).parent('d').remove();
                if($('.project').has('span')){
                        $('.liaocheng_td_3').each(function(){
                        var txt2 = $(this).text();
                        if(txt==txt2){
                            $(this).find('div').remove();
                            $(this).removeClass('liaocheng_td_3').addClass('liaocheng_td_2');
                            $(this).css('border','0.5px solid #7f7f7f');
                        }
                    });
                }else{
                    $('#serviceview').show();
                        $('.liaocheng_td_3').each(function(){
                        var txt2 = $(this).text();
                        if(txt==txt2){
                            $(this).find('div').remove();
                            $(this).removeClass('liaocheng_td_3').addClass('liaocheng_td_2');
                            $(this).css('border','0.5px solid #7f7f7f');
                        }
                    });
                }
            }
        })
    // 预约——服务人员匹配到的值点击选择
        $('.manchoose li').click(function(){
            var txt = $(this).text();
            $('.servicepeople').parent('span').before('<span>'+txt+'</span><span style="margin-right:10px"><img src="images/bin2.jpg" class="removeman" style="height: 100%;"/></span>');
            $(this).parent('ul').hide();
            $('.servicepeople').parent('span').hide();
        })
    // 预约——服务人员选择后的删除事件
        $('.seriverman').on('click','.removeman',function(){
            $(this).parent('span').prev('span').remove();
            $(this).parent('span').remove();
        })
    // 预约——预约弹出框的保存按钮点击事件，创建预约选项
        $('#disidebtn').click(function(){
            if($('#endtime').val()==''){
            }else{
                $('.diside_new').hide();
                $('.mengban3').hide();
                var start =$('.starttime').val();
                var end = $('#endtime').val();
                $('.thisClick').css('position','relative');
                $('.diside_c_1').each(function(){
                    var txt = $(this).text();
                    if(txt == end){
                        var index = $('.thisClick').parent('tr').find('.thisClick').index();//第几个td
                        var index2 = $(this).index();//第几个th
                        var num = index2-index+1;
                        var ddd = (num*100)+num+'%';
                        $('.thisClick').append('<div></div>')
                        $('.thisClick').find('div').css({'width':ddd,'background':'#be78e8'});
                        var text = $('.project').find('span').text();
                        $('.thisClick').find('div').append('<span></span><img src="images/qiandao.jpg"  style="right: 10px;top: 15%;float:right;height: 70%;position: absolute;" class="qiandaobox"/>')
                        $('.project:first').find('span').each(function(){
                            var txt = $(this).text()+' / ';
                            $('.thisClick').find('span').append(txt);
                        })
                    }
                })
            }
        })
    // 预约——签到弹出框的保存按钮点击事件
        $('#qiandao_disidebtn').click(function(){
            if($('#qiandao_endtime').val()==''){
            }else{
                $('.mengban3').hide();
                $('.diside_qiandao').hide();
                $('.diside_new').hide();
                var end = $('#qiandao_endtime').val();
                $('.thisClick').css('position','relative');
                $('.diside_c_1').each(function(){
                    var txt = $(this).text();
                    if(txt == end){
                        var index = $('.thisClick').parent('tr').find('.thisClick').index();//第几个td
                        var index2 = $(this).index();//第几个th
                        var num = index2-index+1;
                        var ddd = (num*100)+num+'%';
                        $('.thisClick').find('div').css('width',ddd);
                    }
                })
                $('.thisClick').find('div').html('<span>正在护理中</span><img src="images/jiezhang.jpg"  style="right: 10px;top: 15%;float:right;height: 70%;" class="jiesuanbox"/>').css('background','#ff8a33');
            }
        })
    // 预约——点击表格生成起始的预约项目表
        $('.diside_box').on('click','.diside_c_2',function(){
            $(this).css('z-index','99');
            $("#endtime").val('');
            $('.thisClick').removeClass('thisClick');
            $(this).addClass('thisClick')
            var index = $(this).parent('tr').find('td').index($(this));
            $('.mengban3').show();
            $('.diside_new').show();
            $('.thisClick').parent('tr').find('.diside_c_4').each(function(){
                var aaa = $(this).attr('colspan');
                index+=parseInt(aaa)-1;
            })
            var txt=$('.diside_center').find('th').eq(index).text();
            $('.starttime').text(txt);
            $('#endtime').val(txt);
        });
    // 预约——签到按钮的点击事件，打开签到弹出框
        $('.diside_box').on('click','.qiandaobox',function(){
            $('.thisView').removeClass("thisView");
            $(this).parent('td').addClass('thisView');
            var txt = $('.starttime').text();
            $(".qiandao_starttime").text(txt);
            $('.mengban3').show();
            $('.diside_new').hide();
            $('.diside_qiandao').show();
            $('#qiandao_endtime').text($('#endtime').text());
        })
    // 预约——结算按钮的点击事件
        $('.diside_box').on('click','.jiesuanbox',function(){
            $(this).parent('td').text('已完成').css({'background':'#83cb68','text-align':'center'});
            $(this).remove();
        })
    // 预约——时刻选择表的显示
        $('#endtime').click(function(){
            $('.timebox').show();
        })
    // 预约——敲到时刻选择表的显示
        $('#qiandao_endtime').click(function(){
            $('.qiaodao_timebox').show();
        })
    // 预约——结束时间时间点击选择
        $('.timebox li').click(function(){
            $('.timebox').hide();
            var txt = $(this).text();
            $('#endtime').val(txt);
        })
        $('.qiaodao_timebox li').click(function(){
            $('.qiaodao_timebox').hide();
            var txt = $(this).text();
            $('#qiandao_endtime').val(txt);
        })
    // 预约——日历插件
        var start = {
            elem: '#J-xl',
            format: 'YYYY-MM-DD',
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16', //最大日期
            istime: false,
            istoday: true,
        };
    // 预约——点击弹出日历
        $('.diside_top img:first').click(function(){
            laydate(start);
        })
        laydate(start);
})
// 疗程——倒计时 设计
    function updateEndTime(){
        var date = new Date();
        var time = date.getTime();
        $(".settime").each(function(i){
            var endDate =this.getAttribute("endTime"); //结束时间字符串
            //转换为时间日期类型
            var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) +')');
            var endTime = endDate1.getTime(); //结束时间毫秒数
            var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
            if(lag > 0)
            {
                var second = Math.floor(lag % 60);
                var minite = Math.floor((lag / 60) % 60);
                var hour = Math.floor((lag / 3600) % 24);
                var day = Math.floor((lag / 3600) / 24);
                $(this).html(day+"天"+hour+"小时"+minite+"分"+second+"秒");
            }
            else{
                $(this).removeClass("settime");
                $(this).parents('tr:first').nextUntil(".liaocheng_father").remove();
                $(this).parents('tr:first').remove();
            }
        });
        setTimeout("updateEndTime()",1000);
    }
