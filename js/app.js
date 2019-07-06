'use strict';

const allImages = [];
let include = [];
let imageArr = [];
let flag = true;
let filePath;
let fileType;
const Images = function (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allImages.push(this);
};
$('button').on('click',function(){

  $('#photo-template').replaceAll();
  if(flag === false){
    flag = true;
  }
  else if(flag === true){
    flag = false;
  }

  Images.getAllimagesFromFile();
  renderDropDown();
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

Images.prototype.renderWithJq = function () {

  var source   = document.getElementById('entry-template').innerHTML;
  var template = Handlebars.compile(source);
  var context = {title: this.title, keyword: this.keyword, description: this.description, horns: this.horns, image: this.image_url};
  var html = template(context);

  $('main').append(html);
};

Images.getAllimagesFromFile = function () {
  console.log(flag);
  if(flag === true){
    filePath = './data/page-1.json';
    fileType = 'json';
  }
  else if(flag === false){
    filePath = './data/page-2.json';
    fileType = 'json';
  }
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
    allImages.forEach(image => {
      image.renderWithJq();
    });
    renderDropDown();
  });
};
Images.getAllimagesFromFile();

