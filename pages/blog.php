<?php
// require '../utils.php';
// require 'dbh.php';
// $sql = 'SELECT * FROM aed_blog ORDER BY blog_id';
// $blogs_posts = $dbh->query($sql)->fetchAll();
$path = './../data/aed_blog.json';
$jsonString = file_get_contents($path);
$blogs_posts = json_decode($jsonString, true);
usort($blogs_posts, function ($a, $b) {
    return $b['blog_id'] <=> $a['blog_id'];
});
// var_dump($blogs_posts);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" rel="stylesheet"
        type="text/css" />
    <link href="./../assets/css/vendors/reset.css" rel="stylesheet" type="text/css" />
    <link href="./../assets/css/desktop_styles.css" rel="stylesheet" type="text/css" />
    <link href="./../assets/css/posts_listing.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://unpkg.com/98.css" />
    <title>Peak Web Design</title>
</head>


<body>
    <header class="">
        <div class="header_div glassmorphic">
            <h1 class="h_title">AlexEatDonut's Blog</h1>
            <p class="h_desc">You won't believe it, it's NOT butter.</p>
        </div>
    </header>

    <main class="">
        <?php foreach ($blogs_posts as $post) { ?>
        <article class="post glassmorphic">
            <div class="post_uppercontainer">
                <div class="post_id">
                    <p><?php echo $post['blog_id'] ?></p>
                </div>
                <div class="post_img">
                    <img class="post_img--img" src="<?php echo $post['blog_thumb'] ?>" />
                </div>
                <div class="post_title">
                    <p>
                        <?php echo $post['blog_title'] ?>
                    </p>
                    <hr>
                </div>
            </div>
            <div class="post_lowercontainer">
                <p> <?php echo $post['blog_content'] ?>
                </p>
            </div>
            <div class="post_date">
                <p><?php echo $post['blog_date'] ?></p>
            </div>
        </article>
        <!-- <textarea> -->
        <?php
            // echo $post['blog_content']
            ?>
        <!-- </textarea> -->
        <?php }
        ?>

    </main>
</body>

</html>