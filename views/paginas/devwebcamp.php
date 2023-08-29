<main class="devwebcamp">
    <h2 class="devwebcamp__heading"><?php echo $titulo; ?></h2>
    <p class="devwebcamp__descripcion">Conoce la conferencia más importante de latinoamérica</p>

    <div class="devwebcamp__grid">
        <div class="devwebcamp__imagen" <?php aos_animacion(); ?>>
            <picture>
                <source srcset="build/img/sobre_devwebcamp.avif" type="image/avif">
                <source srcset="build/img/sobre_devwebcamp.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/sobre_webdevcamp.jpg" alt="Imagen DebWebCamp">
            </picture>
        </div>

        <div class="devwebcamp__contenido">
            <p class="devwebcamp__texto" <?php aos_animacion(); ?>>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit blandit congue. Vivamus commodo libero non ultricies tristique. Etiam varius libero tortor, in finibus nunc egestas vel. Fusce porttitor malesuada nunc, volutpat efficitur ante bibendum efficitur. In dignissim ipsum eu sodales sagittis. Pellentesque at magna eros. Mauris dignissim in nisi at pellentesque. Nulla facilisi.</p>
            <p class="devwebcamp__texto" <?php aos_animacion(); ?>>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit blandit congue. Vivamus commodo libero non ultricies tristique. Etiam varius libero tortor, in finibus nunc egestas vel. Fusce porttitor malesuada nunc, volutpat efficitur ante bibendum efficitur. In dignissim ipsum eu sodales sagittis. Pellentesque at magna eros. Mauris dignissim in nisi at pellentesque. Nulla facilisi.</p>
        </div>
    </div>
</main>