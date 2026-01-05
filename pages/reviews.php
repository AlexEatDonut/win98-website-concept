<?php
// require '../utils.php';
// require 'dbh.php';
// $sql = 'SELECT * FROM aed_review ';
// $reviews_posts = $dbh->query($sql)->fetchAll();
$path = './../data/aed_review.json';
$jsonString = file_get_contents($path);
$reviews_posts = json_decode($jsonString, true);
usort($reviews_posts, function ($a, $b) {
    return $b['review_id'] <=> $a['review_id'];
});
// var_dump($reviews_posts);
?>

<!DOCTYPE html>
<html lang="fr">

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
    <header>
        <div class="header_div glassmorphic">
            <h1 class="h_title">This is the Review place</h1>
            <p class="h_desc">I like reviewing games, and because I can, so I will.</p>
        </div>
    </header>
    <main class="">
        <?php foreach ($reviews_posts as $review) { ?>
        <article class="post glassmorphic">
            <div class="post_uppercontainer">
                <div class="post_id">
                    <p><?php echo $review['review_id'] ?></p>
                </div>
                <div class="post_img">
                    <img class="post_img--img" src="<?php echo $review['review_thumb'] ?>" />
                </div>
                <div class="post_title">
                    <p>
                        <?php echo $review['review_title'] ?>
                    </p>
                    </p>
                </div>
            </div>
            <div class="post_lowercontainer">
                <p> <?php echo $review['review_content'] ?>
                </p>
            </div>
            <div class="post_date">
                <p><?php echo $review['review_date'] ?></p>
            </div>
        </article>
        <?php }
        ?>
    </main>
</body>

</html>