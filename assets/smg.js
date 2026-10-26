/**
 * Slattery Media Group bookstore behaviour:
 * - "Add to cart" links in book cards add via Shopify.actions and open the cart drawer,
 *   falling back to a normal /cart/add form post.
 * - Banner slideshow cross-fades between slides.
 */

document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches('[data-smg-buy]')) return;

  const actions = window.Shopify?.actions;
  if (!actions?.updateCart) return;

  event.preventDefault();
  const button = form.querySelector('button');
  if (button) button.disabled = true;

  try {
    const result = await actions.updateCart(
      { lines: [{ merchandiseId: String(new FormData(form).get('id')), quantity: 1 }] },
      { event: { context: 'product' } }
    );
    if (result?.userErrors?.length) throw new Error(result.userErrors[0].message);
    await actions.openCart();
  } catch (error) {
    console.error('[smg] Add to cart failed, falling back to form post', error);
    form.submit();
  } finally {
    if (button) button.disabled = false;
  }
});

class SmgBanner extends HTMLElement {
  connectedCallback() {
    this.slides = [...this.querySelectorAll('.smg-banner__slide')];
    if (this.slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = Number(this.dataset.interval || 10) * 1000;
    this.index = 0;
    this.timer = setInterval(() => this.next(), interval);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  next() {
    this.slides[this.index].classList.remove('is-active');
    this.index = (this.index + 1) % this.slides.length;
    this.slides[this.index].classList.add('is-active');
  }
}

if (!customElements.get('smg-banner')) {
  customElements.define('smg-banner', SmgBanner);
}
