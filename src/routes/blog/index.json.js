import send from '@polka/send';
import get_posts from './_posts.js';
import { getCookie } from '../../modules/cookie.js'

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		const locale = getCookie('locale', req.headers.cookie);
		const posts = get_posts(locale)
			.filter(post => !post.metadata.draft)
			.map(post => {
				return {
					slug: post.slug,
					metadata: post.metadata
				};
			});

		json = JSON.stringify(posts);
	}

	send(res, 200, json, {
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
}
