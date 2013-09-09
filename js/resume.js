var resume = function() {

    var initialize = function() {
        page.init();
        data.get();
    };
    
    var initMansonry = function(elem) {
        elem.masonry({
            itemSelector : '.item'
        });
    };
    
    var appendArrows = function(s) {
        $.each(s,function(i,obj){
            var posLeft = $(obj).css("left");
            $(obj).find('.event').addClass('borderclass');
            if(posLeft == "0px")
            {
                var html = "<span class='rightCorner'></span>";
                $(obj).prepend(html);			
            }
            else
            {
                var html = "<span class='leftCorner'></span>";
                $(obj).prepend(html);
                $(obj).css("left", "").css('right', '0');
            }
        //$('.timeline_container').append($('<img>').attr('src', 'images/dot.png').css('top', Math.round($(obj).offset().top) + 'px'));
        });
    };
    
    var showItems = function(elems) {
        var elemsArr = new Array();
        elems.each(function() {
            elemsArr.push($(this));
        });
        var k = 0;
        var timer = setInterval(function() {
            if (k > elemsArr.length) clearInterval(timer);
            $(elemsArr[k]).fadeIn(220);
            k++;
        }, 80);
        var timelineFadeinInterval = (elemsArr.length-1)*80+220;
        $('.timeline').fadeIn(timelineFadeinInterval);
    };
    
    /*
    var basic_info = function() {
        var getBasicInfo = function() {
            $.ajax({
                type: "GET",
                datatype: 'JSON',
                beforeSend: function(x) {
                    if(x && x.overrideMimeType) {
                        x.overrideMimeType("application/json;charset=UTF-8");
                    }
                //console.log(data);
                },
                url: "data/basic_info.php",
                timeout: 30000,
                success: function (j) {
                    appendBasicInfo(j);
                },
                error: function(a, b, c) {
                    alert('Info retrieval timed out. Please retry.');
                }
            });
        };
        
        var appendBasicInfo = function(info) {
            $('div.contact_info').append(
                '<table>'+
                '<tr>'+
                '<td>Address</td>'+
                '<td>'+ info.addr_firstline +'<br/>'+ info.addr_secondline +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Phone</td>'+
                '<td>'+ info.phone +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Email</td>'+
                '<td><a href="mailto:'+ info.email +'">'+ info.email +'</a></td>'+
                '</tr>'+
                '</table>'
                );
        };
        
        return {
            get: getBasicInfo
        }
    }();
    */
   
    var page = function() {
        var initialize = function() {
            $('a.see_more').bind('click', resume.recentProjs.toggle);
            
            $('.fb_buttons').bind('mousedown', function() {
                $(this).addClass('active');
            }).bind('mouseup', function() {
                $(this).removeClass('active');
            }).bind('mousemove', function() {
                $(this).removeClass('active');
            });
            
            $('a#facebook').bind('click', function() {
                _gaq.push(['_trackEvent', 'Social Networks', 'View', 'Facebook']);
            });
            $('a#linkedin').bind('click', function() {
                _gaq.push(['_trackEvent', 'Social Networks', 'View', 'Linkedin']);
            });
            $('a#github').bind('click', function() {
                _gaq.push(['_trackEvent', 'Social Networks', 'View', 'Github']);
            });
            $('a#googleplus').bind('click', function() {
                _gaq.push(['_trackEvent', 'Social Networks', 'View', 'Google Plus']);
            });
            $('span#email_wrapper').bind('click', function() {
                _gaq.push(['_trackEvent', 'Personal Contact Info', 'Send Email', 'Email Button']);
            });
            $('a#email_link').bind('click', function() {
                _gaq.push(['_trackEvent', 'Personal Contact Info', 'Send Email', 'Email Link']);
            });
            $('span#resume_wrapper').bind('click', function() {
                _gaq.push(['_trackEvent', 'Downloadable Contents', 'Download', 'Resume']);
            });
               
        };
        
        return {
            init: initialize
        }
    }();
    
    var data = function() {  
        var importData = function() { // append recent projs and set numRecentProjs
            $.ajax({
                type: "GET",
                datatype: 'JSON',
                beforeSend: function(x) {
                    if(x && x.overrideMimeType) {
                        x.overrideMimeType("application/json;charset=UTF-8");
                    }
                },
                url: "data/data.php",
                timeout: 30000,
                success: function (j) {
                    /* the following is for generating recent projects*/
                    var recentProjsArr = j.projs;
                    var numRecentProjs = recentProjsArr.length;
                    recentProjs.setProjNum(numRecentProjs);
                    numRecentProjs <= 4? $('a.see_more').remove() : $('a.see_more').css('display','block');
                    $('a.see_more').find('.text').text(numRecentProjs-4);
                    recentProjs.post(recentProjsArr);
                    
                    /* the following is for generating timeline events */
                    var timelineEvents = j.events;
                    //var numTimelineEvents = timelineEvents.length;
                    events.post(timelineEvents);
                    
                    /* init masonry */
                    initMansonry($('.item_container'));
                    appendArrows($('.item_container').find('.item'));
                    showItems($('.item'));
                    $('div.timeline').css('height', $('div.item_container').css('height'));
                },
                error: function(a, b, c) {
//                    alert(a+b+c);
                }
            });
        };

        return {
            get: importData
        };
    }();
    
    var recentProjs = function() {
        var numRecentProjs = 0;
        var spreaded = false;
        
        var setProjNum = function(n) {
            numRecentProjs = n;
        };
        
        var appendRecentProjs = function(list) {
            for (var i = 0; i < list.length && list.hasOwnProperty(i); ++i) {
                var entry = generateProj(list[i]);
                $('div#slider_wrapper').find('ul').append(entry);
            }
        };
        
        var generateProj = function(proj) {
            var proj_image = new Image();
            proj_image.src = proj.img_url;
            if (!proj_image.complete) {
                proj_image.onload = function() {
                    $(this).fadeIn();
                }
            } else {
                $(proj_image).fadeIn();
            }
            
            var recentProjLink = $('<a>').attr('class', 'basic_proj_content').attr('href', proj.link_url).attr('target','_blank');
            
            var entry = $('<li>').attr('id', 'basic_proj_' + proj.id)
            .append(recentProjLink
                .append($('<div>').attr('class', 'detail')
                    .append($(proj_image))
                    )
                .append($('<div>').attr('class', 'frame')
                    .append($('<div>').attr('class', 'mat'))
                    )
                .append($('<span>').attr('class', 'text').text(proj.name))
                );
            recentProjLink.bind('click', function() {
                _gaq.push(['_trackEvent', 'Recent Projects', 'View', proj.name]);
            });
            return entry;
        };
        
        var toggleProjs = function() {
            var numRows = Math.ceil(numRecentProjs / 4);
            if (!spreaded) {
                $('div.see_more_button').addClass('active');
                $('div.basic_nav').stop().animate({
                    height: 121+(numRows-1)*110
                }, 200);
                _gaq.push(['_trackEvent', 'Recent Projects', 'Toggle More', 'Unfold']);
            } else {
                $('div.see_more_button').removeClass('active');
                $('div.basic_nav').stop().animate({
                    height: 121
                }, 200);
                _gaq.push(['_trackEvent', 'Recent Projects', 'Toggle More', 'Fold']);
            }
            spreaded = !spreaded
        };
        return {
            post: appendRecentProjs,
            toggle: toggleProjs,
            setProjNum: setProjNum
        } 
    }();
    
    var events = function() {
        
        var appendEvents = function(list) {
            for (var i = 0; i < list.length && list.hasOwnProperty(i); ++i) {
                //console.log(list[i]);
                var entry = generateEvents(list[i]);
                $('div.item_container').append(entry);
            }
        };
        
        var generateEvents = function(evt) {
            
            var entry;
            switch(parseInt(evt.type)) {
                case 0: // self intro
                    entry = $(
                        '<div class="item">'+
                        '<div id="event_topline"></div>'+
                        '<div class="event">'+
                        '<img id="ribbon" src="images/ribbon.png" />'+
                        '<div class="event_content">'+
                        '<div role="article">'+
                        '<div class="event_header clear">'+
                        '<a class="event_avatar_wrapper" href="#" onclick="_gaq.push([\'_trackEvent\', \'Event Link (Avatar)\', \'Open\', \'Self Intro\']);">'+
                        '<img src="images/'+ evt.avatar +'.png" class="event_avatar" />'+
                        '</a>'+
                        '<div class="event_title">'+
                        '<h5 class="event_title_name fcg fwb">'+
                        '<a href="#" onclick="_gaq.push([\'_trackEvent\', \'Event Link\', \'Open\', \'Self Intro\']);">'+ evt.name +'</a>'+
                        '</h5>'+
                        '<div class="event_title_des fcg">'+evt.short_des+'</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="event_content_text clear">'+evt.long_des+'</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<i id="event_bottomline"></i>'+
                        '</div>'
                        );
                    break;
                case 1: // education
                    var rows = '';
                    for (var i = 0; i < evt.edu_events.length; ++i) {
                        rows += '<div class="event_content_text clear list_bb">'+
                        '<a target="_blank" href="'+ evt.edu_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link (Avatar)\', \'Open\', \'Education: '+ evt.edu_events[i].name +'\']);">'+
                        '<img src="images/'+ evt.edu_events[i].logo_name +'.png" class="main_content_img" />'+
                        '</a>'+
                        '<div>'+
                        '<div class="school_name fsm fwb">'+
                        '<a target="_blank" href="'+ evt.edu_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link\', \'Open\', \'Education: '+ evt.edu_events[i].name +'\']);">'+ evt.edu_events[i].name +'</a>'+
                        '</div>'+
                        '<div class="school_date fss fcg">'+ evt.edu_events[i].date_from + ' - ' + evt.edu_events[i].date_to + '</div>'+
                        '<div class="school_loc mb5 fss fcg">'+ evt.edu_events[i].loc +'</div>'+
                        '<div class="school_prog fss fwb">'+ evt.edu_events[i].honours +'<br/>'+ evt.edu_events[i].prog +'</div>'+
                        '</div>'+
                        '</div>';
                    }
                    entry = $(
                        '<div class="item">'+
                        '<div id="event_topline"></div>'+
                        '<div class="event">'+
                        '<div class="event_content">'+
                        '<div role="article">'+
                        '<div class="event_header_other">'+
                        '<span class="logo event_header_col">'+
                        '<img src="images/education.png" />'+
                        '</span>'+
                        '<div class="event_header_col">'+
                        '<div class="event_title_name fcb">Education</div>'+
                        '</div>'+
                        '</div>'+
                        rows +
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<i id="event_bottomline"></i>'+
                        '</div>'
                        );
                    break;
                case 2: // experience
                    var xp_entries = '';
                    
                    for (var i = 0; i < evt.xp_events.length; ++i) {
                        var rows = '';
                        for (var j = 0; j < evt.xp_events[i].content.length; ++j) {
                            rows += '<li class="content_list_item">'+ evt.xp_events[i].content[j] +'</li>';
                        }
                        if (parseInt(evt.xp_events[i].xp_type) == 0) { // work experience
                            xp_entries += '<div class="item">'+
                            '<div id="event_topline"></div>'+
                            '<div class="event">'+
                            '<div class="event_content">'+
                            '<div role="article">'+
                            '<div class="event_header clear">'+
                            '<a target="_blank" class="event_avatar_wrapper" href="'+ evt.xp_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link (Avatar)\', \'Open\', \'Work Experience: '+ evt.xp_events[i].name +'\']);">'+
                            '<img src="images/'+ evt.xp_events[i].logo_name +'.png" class="event_avatar" />'+
                            '</a>'+
                            '<div class="event_title">'+
                            '<span class="fcg">'+ evt.xp_events[i].date_from + (evt.xp_events[i].date_to? ' - ' + evt.xp_events[i].date_to : '') +'</span>'+
                            '<h5 class="event_title_name fcg fwb">'+
                            '<a target="_blank" href="'+ evt.xp_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link\', \'Open\', \'Work Experience: '+ evt.xp_events[i].name +'\']);">Worked @ '+ evt.xp_events[i].name +'</a>'+
                            '</h5>'+
                            '<div class="event_title_des fcg">'+
                            evt.xp_events[i].pos +
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '<div class="event_content_text clear">'+
                            '<ul class="event_content_list">'+
                            rows+
                            '</ul>'+
                            '</div>'+
                            '</div>'+
                            '<div class="event_bottom additional_info">'+
                            '<div>'+
                            '<div class="event_bottom_content">'+
                            '<img src="images/info_icon.png" />'+
                            '<span class="additional_name fwb">'+
                            '<a href="mailto:'+ evt.xp_events[i].boss_detail.email +'" onclick="_gaq.push([\'_trackEvent\', \'Employer Email\', \'Send\', \'to: '+ evt.xp_events[i].boss_detail.name +'\']);">'+ evt.xp_events[i].boss_detail.name +'</a>'+
                            '</span>'+
                            '<span class="additional_type fcg">'+ evt.xp_events[i].boss_detail.pos +'</span>'+
                            '<span class="additional_phone fcb">'+ evt.xp_events[i].boss_detail.phone +'</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '<i id="event_bottomline"></i>'+
                            '</div>'
                        } else { // general experience // TODO FIXME
                            xp_entries += '<div class="item">'+
                            '<div id="event_topline"></div>'+
                            '<div class="event">'+
                            '<div class="event_content">'+
                            '<div role="article">'+
                            '<div class="event_header clear">'+
                            '<a class="event_avatar_wrapper" href="#" target="_blank" onclick="_gaq.push([\'_trackEvent\', \'Event Link (Avatar)\', \'Open\', \'General Experience: '+ evt.xp_events[i].name +'\']);">'+
                            '<img src="" class="event_avatar" />'+
                            '</a>'+
                            '<div class="event_title">'+
                            '<span class="fcg">'+ evt.xp_events[i].date_from + (evt.xp_events[i].date_to? ' - ' + evt.xp_events[i].date_to : '') +'</span>'+
                            '<h5 class="event_title_name fcg fwb">'+
                            '<a target="_blank" href="#" onclick="_gaq.push([\'_trackEvent\', \'Event Link\', \'Open\', \'General Experience: '+ evt.xp_events[i].name +'\']);"></a>'+
                            '</h5>'+
                            '<div class="event_title_des fcg"></div>'+
                            '</div>'+
                            '</div>'+
                            '<div class="event_content_text clear">'+
                            '<ul class="event_content_list">'+
                            rows+
                            '</ul>'+
                            '</div>'+
                            '</div>'+                                                    
                            '</div>'+
                            '</div>'+
                            '<i id="event_bottomline"></i>'+
                            '</div>'
                        }
                        
                    }
                    entry = $(xp_entries);
                    break;
                case 3: // activities and interests
                    var rows = '';
                    for (var i = 0; i < evt.activity_events.length; ++i) {
                        rows += '<div class="event_content_text clear list_bb">'+
                        '<a target="_blank" href="'+ evt.activity_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link (Avatar)\', \'Open\', \'Activity and Interests: '+ evt.activity_events[i].name +'\']);">'+
                        '<img src="images/'+ evt.activity_events[i].logo_name +'.png" class="main_content_img_small" />'+
                        '</a>'+
                        '<div>'+
                        '<div class="activities_name fsm fwb">'+
                        '<a target="_blank" href="'+ evt.activity_events[i].link_url +'" onclick="_gaq.push([\'_trackEvent\', \'Event Link\', \'Open\', \'Activity and Interests: '+ evt.activity_events[i].name +'\']);">'+ evt.activity_events[i].name +'</a>'+
                        '</div>'+
                        '<div class="activities_date fss fcg">'+ evt.activity_events[i].date_from +' - '+ evt.activity_events[i].date_to +'</div>'+
                        '<div class="activities_loc fss fcg">'+ evt.activity_events[i].loc +'</div>'+
                        '<div class="activities_pos fss fwb">'+ evt.activity_events[i].pos +'</div>'+
                        '</div>'+
                        '</div>'
                    }
                    entry = $(
                        '<div class="item">'+
                        '<div id="event_topline"></div>'+
                        '<div class="event">'+
                        '<div class="event_content">'+
                        '<div role="article">'+
                        '<div class="event_header_other">'+
                        '<span class="logo event_header_col">'+
                        '<img src="images/clubs.png" />'+
                        '</span>'+
                        '<div class="event_header_col">'+
                        '<div class="event_title_name fcb">Activities & Interests</div>'+
                        '</div>'+
                        '</div>'+
                        rows+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<i id="event_bottomline"></i>'+
                        '</div>'
                        );
                    break;
                default: // others
                    entry = null;
            }
            return entry;
        };
        return {
            post: appendEvents
        }
    }();
    
    
    return {
        init: initialize,
        data: data,
        recentProjs: recentProjs
    }; 
}();


$(document).ready(function() {
    resume.init();
    
});