/*************************
 Jquery fit_modal plugin
 Version: 1.14.6,
 Developer: Philipp Zhulev,
 License: MIT License (MIT),
 Release date: 19.10.2017
 **************************/

(function($){
    jQuery.fn.fit_modal = function(options){

        /* plugin default options */
        options = $.extend({
            modal_frame             :  '.modal__frame', //modal frame class
            modal_window            :  '.modal__window', //modal window class
            modal_body              :  '.modal__window__body', //modal body class
            modal_title_class       :  '.modal__window__title', //modal title class
            modal_title             :  'Modal window', //modal title text
            modal_content_block     :  null, //modal content block
            frame_animation_speed   :  200, //frame animation time
            win_animation_speed     :  500, //window animation time
            window_animation_type   : 'fade_in_top', //window animation type
            modal_close             : '.modal__window__close', //class buttons close
            fast_create             : true, //generate modal window elements
            init_custom_func        : null, //user function
            active_custom_func      : null, //user function
            close_custom_func       : null, //user function
            window_style            : {}, //window inline styles
            frame_style             : {}, //frame inline styles
            on_ajax_mod             : false, //ajax download content
            ajax_mod                : { //ajax options
                href      :  null, //url
                post_type :  'GET', //action type
                data      :  null, //data type
                error_message : "Server error or page not found.", //error message
                success_custom_func : null, //user function
                error_custom_func : null //user function
            },
            close_on_bg   : true, //close modal on background
            responsive_mod          : {  //responsive
                media : 0, //responsive resolution
                on_custom : null, //user function
                off_custom : null, //user function
                custom_func : null //user function
            },
            fix_fw_el    : null, //fixed element
            fix_right_el : null, //fixed element
            set_blur     : null //Blur
        }, options);


        var default_frame =  options.modal_frame,
            default_window =  options.modal_window;

        /* plugin body */
        var include = function(){

            /* this object */
            var $this = $(this),
                contClass = 'modal__content';

            options.modal_frame = default_frame;
            options.modal_window = default_window;

            var this_attr_content = $this.attr('data-content_block');

            /* take content of attr or plugin option */
            if(this_attr_content) {
                options.modal_content_block = this_attr_content;
            }

            /* generate modal ID */
            function generate_id (min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            /* slice function */
            function _sl(e) {
                return e.slice(1);
            }

            var $content = $(options.modal_content_block);

            $content.addClass(contClass);

            /* element data  */
            var fm = $.data($this, 'fit_modal', {
                idClass: '.fm_' + generate_id(135,72354000), //modal ID
                contentClass: contClass,
                allContent: $content.parent().find('.' + contClass),
                attrIndex: 'data-index',
                blurClass: 'fit__blur',
                activeClass: 'fit_modal_open',
                loader: 'fit_modal__load'
            });

            /* id match check  */
            var data_index = fm.allContent.attr(fm.attrIndex);

            if(data_index === undefined) {
                fm.allContent.attr(fm.attrIndex, _sl(fm.idClass));
            }

            /* take ID modal frame and window */
            function set_id (c) {
                if($content.parents(c).length > 0){
                    fm.idClass = '.' + fm.allContent.first().attr(fm.attrIndex);
                }
                return $content.parents(c).addClass(_sl(fm.idClass));
            }

            set_id(options.modal_frame);
            set_id(options.modal_window);

            options.modal_frame  += fm.idClass;
            options.modal_window += fm.idClass;

            /* generate div to determine the scroll-bar size */
            var scroll_div = document.createElement("div");
            scroll_div.className = "scroll-bar__measure";
            document.body.appendChild(scroll_div);

            /* determine the width scroll-bar */
            var sb_width_result = scroll_div.offsetWidth - scroll_div.clientWidth;

            /* remove div to determine the scroll-bar size */
            document.body.removeChild(scroll_div);

            /* hide content child function */
            var hide_child = function () {
                $(options.modal_body).children().hide();
            };

            /* consider attribute the type of animation */
            var this_win_animated = $this.attr('data-win-animation');

            /* add class for element */
            function add_target (obj, target) {
                return obj.addClass(target);
            }

            /* remove class for element */
            function remove_target (obj, target) {
                return obj.removeClass(target);
            }

            /* animation for element */
            function modal_transition(obj, animated) {
                return obj.css('transition', 'all ' + animated  + 'ms');
            }

            /* blur function */
            function set_blur (value) {
                var _blur = options.set_blur,
                    $blur = $(_blur);
                if(_blur !== null) {
                    if(value === 1 && value !== 'init') {
                        $blur.css('transition', 'all ' + options.frame_animation_speed  + 'ms');
                        return $blur.addClass(fm.blurClass);
                    }else {
                        $blur.removeAttr('style');
                        return $blur.removeClass(fm.blurClass);
                    }
                }
            }
            set_blur('init');

            /* consider attribute the type of content */
            function _replace(e) {
                return _sl(e).replace('.', ' ');
            }

            /* fast_create */
            if(options.fast_create === true && $(options.modal_frame).length < 1) {

                /* generate modal elements */
                $content
                    .wrapAll
                            (
                             '<div class="'+ _replace(options.modal_frame) +'">' +
                             '<div class="'+ _replace(options.modal_window) +'">' +
                             '<div class="'+ _replace(options.modal_body) +'">'
                            )
                    .parents
                        (options.modal_window).prepend
                            (
                             '<div class="modal__window__header">' +
                                '<div class="'+ _replace(options.modal_close) +'"></div>' +
                                '<div class="'+ _replace(options.modal_title_class) +'"></div>' +
                             '</div>'
                            )
                ;
            }

            /* hide modal content */
            hide_child();

            /* Vars init */
            var this_frame = $(options.modal_frame),
                this_window = $(options.modal_window),
                this_attr_title = $this.attr('data-title'),
                this_title =  $(options.modal_title_class),
                parent_html = $('html');


            /* where get animation? */
            if(this_win_animated !== undefined) {
                options.window_animation_type = this_win_animated;
            }

            var animate_class = 'fit_' + options.window_animation_type;

            /* 1.Checking for the presence of an animation class.
               2.It "0" then adds */
            if(this_window.filter(fm.idClass).attr('class').indexOf("fit_") + 1 === 0) {
                add_target (this_window, animate_class);
            }

            /* frame user inline styles */
            this_frame.css(
                options.frame_style
            );

            /* window user inline styles */
            this_window.css(
                options.window_style
            );

            if(options.init_custom_func !== null) {
                options.init_custom_func($this, fm);
            }

            /* click event */
            $this.on('click on.modal.active', function (ev) {
                ev.preventDefault();
                hide_child();

                set_blur (1);

                /* need to simulate scroll bar? */
                if(parent_html.height() <= $(window).height()) {
                    sb_width_result = 0;
                }

                /* where get title? */
                if(!this_attr_title) {
                    this_title.html(options.modal_title);
                }else {
                    this_title.html(this_attr_title);
                }

                $content.show();

                /* animation speed for frame */
                modal_transition(this_frame, options.frame_animation_speed);

                add_target(this_frame, fm.activeClass);
                parent_html.addClass(fm.activeClass);

                /* imitation scroll bar for html */
                parent_html.css('padding-right', sb_width_result);

                if(options.fix_fw_el !== null) {
                    $(options.fix_fw_el).css({'padding-right' : sb_width_result});
                }

                if(options.fix_right_el !== null) {
                    $(options.fix_right_el).css({'margin-right' : sb_width_result});
                }

                /* open the modal window */
                function open_init() {
                    add_target (this_window, fm.activeClass);
                    modal_transition(this_window, options.win_animation_speed);
                    clearTimeout(_open);
                    $this.trigger('fm.onWindow');
                }

                var _open;

                /* open timeout function */
                function open_timeout() {
                    _open = setTimeout(open_init, options.frame_animation_speed);
                }

                /* active modal user function*/
                if(options.active_custom_func !== null) {
                    options.active_custom_func($this, fm);
                }

                /* ajax mod */
                if(options.on_ajax_mod  === true) {

                    var fm_ajax = options.ajax_mod;

                    /*Take url attr*/
                    var href_attr = $this.attr('data-href');

                    /* take ajax url of attr or plugin option? */
                    if(href_attr) {
                        fm_ajax.href = href_attr;
                    }

                    var loader = fm.loader,  //pre-loader
                        pre_loader = $('.' + loader);

                    /*Ajax request*/
                    $.ajax({
                        url: fm_ajax.href,
                        type: fm_ajax.post_type,
                        data: fm_ajax.data,
                        async: true,
                        beforeSend : function () {

                            /* add pre-loader */
                            this_frame.append('<div class="'+ loader +'"></div>');

                        },
                        success : function (returned) {

                            /* 1.return content */
                            /* 2.delete pre-loader */
                            /* 3.open window */
                            $content.load(href_attr, function () {
                                 pre_loader.remove();
                                 open_timeout();
                            });
                            if(fm_ajax.success_custom_func !== null) {
                                fm_ajax.success_custom_func($this, fm, returned);
                            }
                        },
                        error : function (err) {  //ajax error
                            $content.html(fm_ajax.error_message);
                            pre_loader.remove();
                            open_timeout();

                            /* ajax error user function */
                            if(fm_ajax.error_custom_func !== null) {
                                fm_ajax.error_custom_func($this, fm, err);
                            }
                        }
                    });

                }else {
                    open_timeout();
                }
                $this.trigger('fm.onActive'); //event

                return true
            });

            /* close modal function */
            function modal__close() {
                remove_target (this_window, fm.activeClass);

                function close_init() {
                    remove_target (this_frame, fm.activeClass);
                    parent_html.removeClass(fm.activeClass).removeAttr('style');
                    $(options.fix_fw_el + ',' + options.fix_right_el).removeAttr('style');
                    set_blur (0);
                    clearTimeout (_clear);

                    $this.trigger('fm.onCloseFrame'); //event
                }

                /* close modal user function */
                if(options.close_custom_func !== null) {
                    options.close_custom_func($this, fm);
                }

                var _clear = setTimeout(close_init, options.win_animation_speed);

                $this.trigger('fm.onClose'); //event
            }

            /* close modal window by clicking on close-icon */
            $(options.modal_close).on('click on.modal.close', function () {
                modal__close();
            });

            /* close modal window by clicking on background */
            if(options.close_on_bg === true) {
                this_frame.click(function (e) {
                    if (!this_window.is(e.target) && this_window.has(e.target).length === 0) {
                        modal__close();
                    }
                });
            }


            /* responsive modification */
            if(options.responsive_mod.media !== 0) {

                var resp = options.responsive_mod;

                /* responsive function */
                function set_responsive() {
                   if($(window).width() < resp.media) {
                       add_target(options.modal_window, 'modal__responsive');
                       $this.trigger('fm.onResponsive'); //event

                       /* on responsive user function */
                       if(resp.on_custom !== undefined) {
                           resp.on_custom($this, fm);
                       }
                   }else {
                       remove_target(options.modal_window, 'modal__responsive');

                       $this.trigger('fm.offResponsive'); //event

                       /* off responsive user function */
                       if(resp.off_custom !== undefined) {
                           resp.off_custom($this, fm);
                       }
                   }
                    if(resp.custom_func !== undefined) {
                        resp.custom_func($this, fm);
                    }
                }

                set_responsive();

                /* resize function */
                $(window).resize(set_responsive);
            }

        };

        return this.each(include);

    };
})(jQuery);
