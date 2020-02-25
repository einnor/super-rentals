import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'super-rentals/config/environment';

module('Integration | Component | map', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function(assert) {
    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
      />
    `);

    assert.dom('.map').exists();
    assert.dom('.map img').hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184');
    assert.dom('.map img').hasAttribute('src', /^https:\/\/api\.mapbox\.com/, 'the src starts with "https://api.mapbox.com"');
    assert.dom('.map img').hasAttribute('width', '150');
    assert.dom('.map img').hasAttribute('height', '120');

    const { src } = find('.map img');
    const token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    assert.ok(src.includes('-122.4184,37.7797,10'), 'the src should include the lng,lat,zoom parameter');
    assert.ok(src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
    assert.ok(src.includes(`access_token=${token}`), 'the src should include the escaped access token');
  });
});
