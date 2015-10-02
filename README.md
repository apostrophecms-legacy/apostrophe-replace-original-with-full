Usage:

```
npm install -g apostrophe-replace-original-with-full

replace-original-with-full /opt/stagecoach/apps/YOURAPP/current/public/uploads/files
```

Hardlinks the "original" of each image to the "full" scaled version,
greatly reducing storage requirements. However note that the true
"original" is GONE FOREVER. Gone gone gone. If you have public
"download the original" features, this is a terrible idea. Handy
on sites with zillions of images and no requirement for high-quality
originals to remain available after upload.

Often run as a cron job with the `--quiet` option:

```
0 3 * * * replace-original-with-full /opt/stagecoach/apps/YOURAPP/current/public/uploads/files --quiet
```

If you add the `--link-all-sizes` option, the rest of the usual Apostrophe image sizes, like `one-half` and `one-sixth`, are also symbolic links to the `full` size. This is NOT a good idea in production because it would force people to download `full` when they only need a thumbnail! But, it can be handy in a dev environment to conserve space even further.

If you add the `--extra-sizes` option, you can configure a comma-separated list of extra sizes beyond the standard ones. This is only relevant in combination with `--link-all-sizes`.

This utility is a simple shelljs script, it's not part of Apostrophe itself.

