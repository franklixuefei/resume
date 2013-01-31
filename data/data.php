
<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$data = array();

$projs = array(
    array(
        'id' => 1,
        'img_url' => 'images/hanoi_proj.png',
        'name' => 'Tower of Hanoi',
        'link_url' => 'https://github.com/franklixuefei/tower_of_hanoi'
    ),
    array(
        'id' => 2,
        'img_url' => 'images/baitanla_proj.png',
        'name' => 'Baitanla',
        'link_url' => 'http://xuefei-frank.com/market/'
    ),
    array(
        'id' => 3,
        'img_url' => 'images/credvine_proj.png',
        'name' => 'Credvine',
        'link_url' => 'http://credvine.com'
    ),
    array(
        'id' => 4,
        'img_url' => 'images/quadris_proj.png',
        'name' => 'Quadris',
        'link_url' => 'https://github.com/franklixuefei/quadris'
    ),
    array(
        'id' => 4,
        'img_url' => 'images/quadris_proj.png',
        'name' => 'Quadris',
        'link_url' => 'https://github.com/franklixuefei/quadris'
    )
);

$data['projs'] = $projs;

$self_intro = array(
    'type' => 0, // self intro
    'name' => 'Xuefei Li',
    'avatar' => 'avatar_small',
    'short_des' => 'CSer at Waterloo',
    'long_des' => 'Hello everyone! I\'m a dedicated Computer Science guy at Univeristy of Waterloo. I love to get involved in the latest technologies and hand on various
                    kinds of projects. <br/>My area of interests are web development and mobile game development.'
);

$education = array(
    'type' => 1, // education
    'edu_events' => array(
        array(
            'logo_name' => 'uwaterloo_logo',
            'link_url' => 'http://uwaterloo.ca',
            'name' => 'University of Waterloo',
            'loc' => 'Waterloo, Ontario, Canada',
            'date_from' => 'Jan 2011',
            'date_to' => 'present',
            'honours' => 'Honours Computer Science',
            'prog' => 'Co-op Program'
        )
    )
);

$experience = array(
    'type' => 2, // work
    'xp_events' => array(
        array(
            'xp_type' => 0, // work experience
            'logo_name' => 'friendoc',
            'name' => 'FrienDoc Inc.',
            'link_url' => 'http://www.sparkgrowthpar.com',
            'pos' => 'Web Developer',
            'content' => array(
                'Built a complete real-time messaging system, with automatic message pushing and notification.',
                'Optimized SQL queries for optimal speed of data exchanging and better user experience.',
                'Constructed the project back-end framework using CodeIgniter (written in PHP) with MVC architecture.',
                'Executed alpha and closed beta tests across all major browsers including IE8.'
            ),
            'date_from' => 'Sep',
            'date_to' => 'Dec. 2012',
            'boss_detail' => array(
                'name' => 'Xinyuan Fan',
                'pos' => 'Co-Founder',
                'phone' => '519-781-1052',
                'email' => 'xinyuan.f@gmail.com'
            )
        ),
        
        array(
            'xp_type' => 0, // work experience (1 = general experience (without or different footer))
            'logo_name' => 'sparkgrowth',
            'name' => 'Spark Growth Partners',
            'link_url' => 'http://www.sparkgrowthpartners.com',
            'pos' => 'Database Design and Integration Developer',
            'content' => array(
                'Developed the business referral system compatible for both desktops and mobile devices.',
                'Implemented merge tags and merge-tag parser for automatically pulling business information.',
                'Developed auto-saving and auto-recovery mechanism for user input.',
                'Managed the basics of Ruby on Rails in one week, and use it as the project framework along with MySQL Lite.'
            ),
            'date_from' => 'Jan',
            'date_to' => 'Apr. 2012',
            'boss_detail' => array(
                'name' => 'Elissa K.Liu',
                'pos' => 'CEO/Founding Partner',
                'phone' => '416-992-5499',
                'email' => 'elissa@sparkgrowthpartners.com'
            )
        )
    )
);

$activities = array(
    'type' => 3, //activities
    'activity_events' => array(
        array(
            'logo_name' => 'csc',
            'link_url'=> 'http://csclub.uwaterloo.ca/',
            'name' => 'Computer Science Club',
            'loc' => 'University of Waterloo',
            'pos' => 'Member',
            'date_from' => 'Sep 2011',
            'date_to' => 'present'
        ),
        array(
            'logo_name' => 'warlords',
            'link_url'=> 'http://waterloowarlords.ca/',
            'name' => 'Waterloo Warlords Paintball Club',
            'loc' => 'University of Waterloo',
            'pos' => 'Member',
            'date_from' => 'Jan 2011',
            'date_to' => 'present'
        )
    )
);

$events = array();

array_push($events, $self_intro);
array_push($events, $education);
array_push($events, $experience);
array_push($events, $activities); // date range is optional

$data['events'] = $events;

echo json_encode($data);
?>
