"use strict";
jQuery(function($) {
    var $Body = $('body'),
        $Window = $(window),
        $Page = $('#Page'),
        $TheList = $('#TheList'),
        $TheListList = $('#TheList__List'),
        $Logo = $('#HomeUi__Header'),
        $Border = $('#Border'),
        $UI = $('#HomeUi'),
        $Subpage = $('#Subpage'),
        $SubpageContent = $('#Subpage__Content'),
        $SubpageClose = $('#Subpage__Close');
    $Body.css('background', $TheList.find('[data-color]').eq(0).attr('data-color'));
    $Window.on('load', function() {
        setTimeout(function() {
            $Border.removeClass('Faded');
        }, 2000);
        setTimeout(function() {
            $Logo.removeClass('Dark');
        }, 2500);
        setTimeout(_DeepLink, 3000);
    });
    _LogoAnim();
    _MenuEvents();

    function _HeaderAnim() {
        $Subpage.find('h2 > span').removeClass('Active');
        var Interval = setInterval(function() {
            $Subpage.find('h2 > div > span:not(.Active)').eq(Math.floor(Math.random() * $Subpage.find('h2 > div > span:not(.Active)').size())).addClass('Active');
            if (!$Subpage.find('h2 > div > span:not(.Active)').size()) {
                window.clearInterval(Interval);
            }
        }, 200);
    }

    function _DeepLink() {
        var Href = window.location.hash;
        if (Href.substr(0, 2) == '#/') {
            if ($Subpage.hasClass('Loaded')) {
                $Subpage.animate({
                    opacity: 0
                }, 500, function() {
                    $Subpage[0].scrollTop = 0;
                    $.get('subpages/' + Href.replace('#/', '') + '.html', function(Reply) {
                        $SubpageContent.html(Reply);
                        $SubpageContent.find('h2 > div').each(function() {
                            var Chars = $.trim($(this).html()).split("");
                            $(this).html('<span>' + Chars.join('</span><span>') + '</span>');
                            $Subpage.animate({
                                opacity: 1
                            }, 500);
                        });
                    });
                });
            } else {
                $.get('subpages/' + Href.replace('#/', '') + '.html', function(Reply) {
                    $SubpageContent.html(Reply);
                    $SubpageContent.find('h2 > div').each(function() {
                        var Chars = $.trim($(this).html()).split("");
                        $(this).html('<span>' + Chars.join('</span><span>') + '</span>');
                    });
                });
                $Border.addClass('Faded');
                $UI.addClass('Dark');
                $Logo.addClass('Active');
                $UI.addClass('Subsection');
                $Subpage.css('display', 'block');
                $Subpage[0].scrollTop = 0;
                setTimeout(function() {
                    $Body.css('overflow', 'hidden');
                    $Subpage.animate({
                        opacity: 1
                    }, 500, function() {
                        $Subpage.addClass('Loaded');
                    });
                    _HeaderAnim();
                }, 900);
            }
            return false;
        }
    }

    function _MenuEvents() {
        $TheList.on('mouseover click touchstart', '[data-color]', _ChangeColor);
        $Body.on('click', 'a', _MenuClicked);
        $Window.on('resize rotate scroll', _TheEvents);
        _TheEvents();
        window.requestAnimationFrame(_AnimFrame);
        setInterval(_setScroll, 10);
        var CurrentScroll = -document.scrollingElement.scrollTop,
            TargetScroll = -document.scrollingElement.scrollTop;

        function _TheEvents() {
            var ListHeight = $TheList.outerHeight(),
                PageHeight = $Page.height();
            if (PageHeight != ListHeight) {
                $Page.height($TheList.height());
            }
            TargetScroll = -document.scrollingElement.scrollTop;
        }

        function _MenuClicked() {
            var Href = $(this).attr('href');
            if (Href.substr(0, 2) == '#/') {
                window.location.hash = Href;
                if ($Subpage.hasClass('Loaded')) {
                    $Subpage.animate({
                        opacity: 0
                    }, 500, function() {
                        $Subpage[0].scrollTop = 0;
                        $.get('subpages/' + Href.replace('#/', '') + '.html', function(Reply) {
                            $SubpageContent.html(Reply);
                            $SubpageContent.find('h2 > div').each(function() {
                                var Chars = $.trim($(this).html()).split("");
                                $(this).html('<span>' + Chars.join('</span><span>') + '</span>');
                                $Subpage.animate({
                                    opacity: 1
                                }, 500);
                            });
                        });
                    });
                } else {
                    $.get('subpages/' + Href.replace('#/', '') + '.html', function(Reply) {
                        $SubpageContent.html(Reply);
                        $SubpageContent.find('h2 > div').each(function() {
                            var Chars = $.trim($(this).html()).split("");
                            $(this).html('<span>' + Chars.join('</span><span>') + '</span>');
                        });
                    });
                    $Border.addClass('Faded');
                    $UI.addClass('Dark');
                    $Logo.addClass('Active');
                    $UI.addClass('Subsection');
                    $Subpage.css('display', 'block');
                    $Subpage[0].scrollTop = 0;
                    setTimeout(function() {
                        $Body.css('overflow', 'hidden');
                        $Subpage.animate({
                            opacity: 1
                        }, 500, function() {
                            $Subpage.addClass('Loaded');
                        });
                        _HeaderAnim();
                    }, 900);
                }
                return false;
            }
        }
        $SubpageClose.on('click', function() {
            window.location.hash = '';
            $Subpage.removeClass('Loaded');
            $Subpage.animate({
                opacity: 0
            }, 500, function() {
                $Subpage[0].scrollTop = 0;
                $SubpageContent.html('');
                $Border.removeClass('Faded');
                $UI.removeClass('Dark');
                $Logo.removeClass('Active');
                $UI.removeClass('Subsection');
                $Body.css('overflow', 'auto');
                $Subpage.css('display', 'none');
            });
            return false;
        });

        function _setScroll() {
            CurrentScroll = CurrentScroll - (CurrentScroll - TargetScroll) / 30;
        }

        function _ChangeColor() {
            $Body.css('background', $(this).attr('data-color'));
        }

        function _AnimFrame() {
            $TheListList.css('transform', 'translate3d(0,' + CurrentScroll + 'px,0)');
            window.requestAnimationFrame(_AnimFrame);
        }
    }

    function _LogoAnim() {
        var Mode = true;
        setInterval(function() {
            if (Mode) {
                $Logo.find('span:not(.Active)').eq(Math.floor(Math.random() * $Logo.find('span:not(.Active)').size())).addClass('Active');
                if (!$Logo.find('span:not(.Active)').size()) {
                    Mode = false;
                }
            } else {
                $Logo.find('span.Active').eq(Math.floor(Math.random() * $Logo.find('span.Active').size())).removeClass('Active');
                if (!$Logo.find('span.Active').size()) {
                    Mode = true;
                }
            }
        }, 200);
    }
});
