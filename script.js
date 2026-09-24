document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ==========================================
  // CURSOR GLOW ON DESKTOP
  // ==========================================

  const cursorGlow = document.querySelector(".cursor-glow");

  if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    window.addEventListener("pointermove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = "none";
  }

  // ==========================================
  // THREE.JS HERO SCULPTURE
  // ==========================================

  const canvasHost = document.querySelector("#hero-canvas");

  if (canvasHost && window.THREE) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      35,
      canvasHost.clientWidth / canvasHost.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0.2, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      canvasHost.clientWidth,
      canvasHost.clientHeight
    );

    renderer.outputEncoding = THREE.sRGBEncoding;

    canvasHost.appendChild(renderer.domElement);

    const group = new THREE.Group();

    scene.add(group);

    // ==========================================
    // LIGHTING
    // ==========================================

    const ambient = new THREE.AmbientLight(
      0xcbb38b,
      1.5
    );

    scene.add(ambient);

    const keyLight = new THREE.PointLight(
      0xf0d6a3,
      3.4,
      15
    );

    keyLight.position.set(3, 3, 4);

    scene.add(keyLight);

    const rimLight = new THREE.PointLight(
      0x6e8b95,
      2.2,
      12
    );

    rimLight.position.set(-4, 1, 1);

    scene.add(rimLight);

    // ==========================================
    // MATERIALS
    // ==========================================

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x25211c,
      metalness: 0.4,
      roughness: 0.18,
      transparent: true,
      opacity: 0.94,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7a56a,
      metalness: 0.8,
      roughness: 0.22,
    });

    // ==========================================
    // BOTTLE BODY
    // ==========================================

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(
        1.02,
        1.08,
        2.8,
        64
      ),
      glassMaterial
    );

    body.position.y = -0.15;

    group.add(body);

    // ==========================================
    // BOTTLE SHOULDER
    // ==========================================

    const shoulder = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.72,
        1.02,
        0.45,
        64
      ),
      glassMaterial
    );

    shoulder.position.y = 1.48;

    group.add(shoulder);

    // ==========================================
    // BOTTLE NECK
    // ==========================================

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.42,
        0.42,
        0.78,
        64
      ),
      glassMaterial
    );

    neck.position.y = 2.08;

    group.add(neck);

    // ==========================================
    // BOTTLE CAP
    // ==========================================

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.46,
        0.46,
        0.42,
        64
      ),
      goldMaterial
    );

    cap.position.y = 2.68;

    group.add(cap);

    // ==========================================
    // BOTTLE LABEL
    // ==========================================

    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.34, 1.35),
      new THREE.MeshStandardMaterial({
        color: 0xd8c5a4,
        roughness: 0.8,
        metalness: 0.05,
      })
    );

    label.position.set(0, -0.12, 1.095);

    group.add(label);

    // ==========================================
    // LABEL RING
    // ==========================================

    const labelRing = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.39, 64),
      goldMaterial
    );

    labelRing.position.set(0, -0.12, 1.11);

    group.add(labelRing);

    // ==========================================
    // FLOATING PARTICLES
    // ==========================================

    const particles = new THREE.Group();

    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xc7a56a,
      transparent: true,
      opacity: 0.55,
    });

    for (let i = 0; i < 35; i++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(
          Math.random() * 0.018 + 0.008,
          8,
          8
        ),
        particleMaterial
      );

      particle.position.set(
        (Math.random() - 0.5) * 4.4,
        (Math.random() - 0.5) * 5.2,
        (Math.random() - 0.5) * 1.5
      );

      particles.add(particle);
    }

    scene.add(particles);

    // ==========================================
    // POINTER INTERACTION
    // ==========================================

    let pointerX = 0;
    let pointerY = 0;

    let targetX = 0;
    let targetY = 0;

    canvasHost.addEventListener(
      "pointermove",
      (event) => {
        const bounds =
          canvasHost.getBoundingClientRect();

        pointerX =
          ((event.clientX - bounds.left) /
            bounds.width -
            0.5) *
          2;

        pointerY =
          ((event.clientY - bounds.top) /
            bounds.height -
            0.5) *
          2;
      }
    );

    canvasHost.addEventListener(
      "pointerleave",
      () => {
        pointerX = 0;
        pointerY = 0;
      }
    );

    // ==========================================
    // THREE.JS ANIMATION LOOP
    // ==========================================

    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();

      targetX +=
        (pointerX - targetX) * 0.035;

      targetY +=
        (pointerY - targetY) * 0.035;

      if (!prefersReducedMotion) {
        group.rotation.y =
          targetX * 0.35 +
          Math.sin(elapsed * 0.45) * 0.12;

        group.rotation.x =
          targetY * 0.12;

        group.position.y =
          Math.sin(elapsed * 0.8) * 0.08;

        particles.rotation.y =
          elapsed * 0.035;

        particles.rotation.x =
          Math.sin(elapsed * 0.2) * 0.08;
      }

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    // ==========================================
    // RESPONSIVE CANVAS RESIZE
    // ==========================================

    function resize() {
      const width = canvasHost.clientWidth;
      const height = canvasHost.clientHeight;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", resize);

    animate();
  }

  // ==========================================
  // GSAP SCROLL ANIMATIONS
  // ==========================================

  if (
    window.gsap &&
    window.ScrollTrigger &&
    !prefersReducedMotion
  ) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    gsap.from(".hero-title .line", {
      yPercent: 120,
      opacity: 0,
      duration: 1.35,
      stagger: 0.12,
      ease: "power4.out",
      delay: 0.2,
    });

    // General reveal animations
    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.from(element, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });

    // Product card animations
    gsap.utils
      .toArray(".product-card")
      .forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: index * 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });

    // Craft section text animation
    gsap.from(".craft-copy", {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".craft-layout",
        start: "top 75%",
        once: true,
      },
    });

    // Craft section artwork animation
    gsap.from(".craft-art", {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".craft-layout",
        start: "top 75%",
        once: true,
      },
    });

    // Craft artwork parallax animation
    gsap.to(".arch-inner", {
      yPercent: -8,
      ease: "none",

      scrollTrigger: {
        trigger: ".craft-art",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});
