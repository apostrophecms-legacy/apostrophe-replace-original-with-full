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

Often run as a cron job:

```
0 3 * * * replace-original-with-full /opt/stagecoach/apps/YOURAPP/current/public/uploads/files
```

This utility is a simple shelljs script, it's not part of Apostrophe itself.

