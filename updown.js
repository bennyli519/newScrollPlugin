/*
    2018年3月21日11:42:05
    @author:Benny
    @explain：JQ上下滚动翻页
*/
(function ($) {
    $.fn.extend({
        lksscroll: function (opt, callback) {
            //参数初始化
            if (!opt) var opt = {};
            var _this = this.find("ul:first");
            var _btnUp = $("#" + opt.upBtn); //Shawphy:向上按钮
            var _btnDown = $("#" + opt.downBtn); //Shawphy:向下按钮           
            var time = opt.time; //间隔时间
            var speed = opt.speed; //过渡时间

            var lineH = _this.find("li:first").height(), //获取行高
                total = _this.find("li").length; //总条数

            var timerID; //定时器
            var index = 0;


            var newDom = this.find("li").eq(0).clone(true); //克隆第一条
            _this.append(newDom); //追加到ul后


            //自动播放
            var autoPlay = function () {
                timerID = setInterval(function () {
                    if (index == total) {
                        index = 0;
                        _this.css({
                            top: 0
                        })
                    }
                    index++;
                    play(index);
                }, time)
            }

            var isClick = true;//是否点击(防止点击次数过多)


            //Shawphy:向下翻页函数
            var scrollDown = function () {
                if (isClick) {
                    isClick = false;
                    if (index == total) {
                        index = 0;
                        _this.css({
                            top: 0
                        })
                    }
                    index++;
                    play(index);
                }

            }

            //向上翻页函数
            var scrollUp = function () {

                if (isClick) {
                    isClick = false;
                    if (index == 0) {
                        index = total;
                        _this.css({
                            top: -(total * lineH)
                        })
                    }
                    index--;
                    play(index);
                }

            }

            var stopPlay = function () {
                clearInterval(timerID);
            }

            function play(index) {
                var newHeight = index * lineH;
                _this.animate({
                    top: -newHeight
                }, speed, function () {
                    isClick = true
                })


            };

            this.hover(stopPlay, autoPlay).mouseout();
            _btnUp.css("cursor", "pointer").click(scrollUp).hover(stopPlay, autoPlay);
            _btnDown.css("cursor", "pointer").click(scrollDown).hover(stopPlay, autoPlay);
        }
    });
})(jQuery);