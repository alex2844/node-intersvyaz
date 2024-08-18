#!/usr/bin/env node

import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

function main(github, context) {
	return github.rest.repos.listReleases({
		per_page: 1,
		owner: context?.repo.owner,
		repo: context?.repo.repo
	}).then(({ data: [ latest ] }) => {
		if (latest?.tag_name != pkg.version) {
			const log = fs.readFileSync('docs/CHANGELOG.md', 'utf-8');
			const body = log.split('## [').find(tag => tag.startsWith(pkg.version+']'))?.split('\n').slice(1).join('\n').trim();
			return github.rest.repos.createRelease({
				body,
				tag_name: pkg.version,
				name: 'Release '+pkg.version,
				owner: context?.repo.owner,
				repo: context?.repo.repo
			}).then(release => {
				return true;
			});
		}else
			return false;
	});
};

export default main;
