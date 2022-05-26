const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const del = require('del')
const replace = require('gulp-replace')
const {fetch, refresh, upload} = require('qiniu-tool-v2')

const key = ""
const token = ""
const pathPre = "wechat-listener"


// 文件读取方法
const readFileList = (dir, filesList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        let fullPath = path.join(dir, item);
        let name = item;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList); //递归读取文件
        } else {
            filesList.push({dir, fullPath, name});
        }
    });
    return filesList;
}

// 清空build文件夹
gulp.task('clean', cb => {
    del.sync(['dist/*'], {dot: true});
    cb();
});

async function ossUpload(dir, path) {
    await upload({
        ak: key,
        sk: token,
        scope: 'douyinpay',
        zone: 'qiniu.zone.Zone_z2', // 七牛空间（默认Zone_z1）
    }, path, `${pathPre}/${path.substring("dist/".length)}`)
    console.log('upload success ', path, 'https://douyin.61week.com/' + `${pathPre}/${path.substring("dist/".length)}`)
}

// 替换SDK内的变量
gulp.task('replacePath', () => {
    return gulp.src('./dist/index.html')
        .pipe(replace("/assets", "/wechat-listener/assets"))
        .pipe(gulp.dest('./dist', {overwrite: true}))
})

// 上传资源文件
gulp.task('uploadResource', cb => {
    let filesList = [];
    readFileList('./dist', filesList);
    return Promise.all(filesList.map(info => {
        let readingFile = fs.readFileSync(info.fullPath);
        return ossUpload(info.dir, info.fullPath, info.name);
    }));
});
// 上传
gulp.task('upload', gulp.series(['replacePath', 'uploadResource']));

