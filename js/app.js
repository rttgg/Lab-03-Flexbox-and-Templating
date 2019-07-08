'use strict';

const allImages = [];
const allImages2 = [];
let include = [];
let imageArr = [];
let flag = true;
let doIt = false;
let filePath;
let fileType;

const Images = function (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  if(filePath ==='./data/page-1.json' ){
    allImages.push(this);
  }
  else if(filePath === './data/page-2.json' ){
    console.log('hello');
    allImages2.push(this);
  }
  console.log(allImages2);
};

$('button').click(function(){
  if(doIt === false){
    Images.getAllimagesFromFile2();
    doIt = true;
  }
  $( '.json1' ).toggle( 'slow', function() {
  });
});

$('select').on('click', function () {
  let $clickedOption = $(this).val();
  $('main > section ').hide();
  $(`main > section img[alt=${$clickedOption}`).parent().show();
  if($clickedOption === 'default'){
    $('main > section ').show();
  }
});

const renderDropDown = function () {
  const selectEl = $('select');
  selectEl.children().each(function () {
    this.remove();
  });

  include.forEach((value, index) => {
    const $newOption = $('<option></option>');
    const selectTemplateHtml = $('#myOption').html();
    $newOption.html(selectTemplateHtml);
    $newOption.add(index).text(value);
    $newOption.attr('value', value);
    $(selectEl).append($newOption);
  });
};
Images.prototype.renderWithJqAfter = function(){

};
Images.prototype.renderWithJq = function (){
  if(flag === true){
    var source   = document.getElementById('entry-template').innerHTML;
    var template = Handlebars.compile(source);
    var context = {title: this.title, keyword: this.keyword, description: this.description, horns: this.horns, image: this.image_url};
  }
  else if(flag === false){
    source = document.getElementById('entry-template2').innerHTML;
    template = Handlebars.compile(source);
    context = {title2: this.title, keyword2: this.keyword, description2: this.description, horns2: this.horns, image2: this.image_url};
  }
  var html = template(context);

  $('main').append(html);
};

Images.getAllimagesFromFile = function () {
  filePath = './data/page-1.json';
  fileType = 'json';
  $.get(filePath, fileType).then(myImagesJSON => {
    myImagesJSON.forEach(image => {
      new Images(image.image_url, image.title, image.description, image.keyword, image.horns);
    });
    allImages.forEach((value, index) => {
      imageArr.push(allImages[index].keyword);
    });
    include.push('default');
    $.each(imageArr, function (value, index) {
      if ($.inArray(index, include) === -1) include.push(index);
    });
    if(allImages.length < 21){
      allImages.forEach(image => {
        image.renderWithJq();
      });
    }
    renderDropDown();
  });
};
Images.getAllimagesFromFile2 = function () {
  filePath = './data/page-2.json';
  fileType = 'json';
  $.get(filePath, fileType).then(myImagesJSON => {
    myImagesJSON.forEach(image => {
      new Images(image.image_url, image.title, image.description, image.keyword, image.horns);
    });
    allImages.forEach((value, index) => {
      imageArr.push(allImages[index].keyword);
    });
    include.push('default');
    $.each(imageArr, function (value, index) {
      if ($.inArray(index, include) === -1) include.push(index);
    });
    allImages2.forEach(image => {
      image.renderWithJq();
    });
    renderDropDown();
  });
  $('.json2').hide();
};
Images.getAllimagesFromFile();



