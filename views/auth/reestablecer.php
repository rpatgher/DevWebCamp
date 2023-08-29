<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Coloca tu nuevo Password</p>

    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <?php if($token_valido): ?>
        <form class="formulario" method="POST">
            <div class="formulario__campo">
                <label for="password" class="label formulario__label">Password</label>
                <input 
                    type="password" 
                    class="formulario__input"
                    placeholder="Tu Nuevo Password"
                    id="password"
                    name="password"
                    />
            </div>


            <input type="submit" class="formulario__submit" value="Guardar Cambios">
        </form>
    <?php endif; ?>

    <div class="acciones">
        <a href="/login" class="acciones__enlace">¿Ya tienes cuenta? Iniciar Sesión.</a>
        <a href="/registro" class="acciones__enlace">¿Aún no tienes cuenta? Crea una.</a>
    </div>
</main>