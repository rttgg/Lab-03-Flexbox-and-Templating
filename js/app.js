'use strict';



const allImages = []

const Images = function(image_url, title, description, keyword, horns){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allImages.push(this);
};


$('select').on('click',function(){
  let $clickedOption = $(this).val()
  console.log('This is the clicked on',$clickedOption);
  if($clickedOption === this.keyword){
    $('#photo-template').show(this.image_url);
  }
});


Images.prototype.renderWithJq = function() {
  const $newImage = $('<section></section>');
  const $newOption = $('<option></option>');


  const imageTemplateHtml = $('#photo-template').html();
  const selectTemplateHtml = $('#myOption').html();

  $newImage.html(imageTemplateHtml);
  $newOption.html(selectTemplateHtml);
  allImages.forEach((value, index) => {

    $newOption.eq(index).html(this.keyword);
    $newOption.eq(index).attr('value',this.keyword);
  });

  $newImage.find('h2').text(this.title);
  $newImage.find('h3').text(this.keyword);
  $newImage.find('img').attr('src',this.image_url);

  // $newImage.find('p').text(this.description);
  $newImage.find('.one' ).text(this.description);
  $newImage.find('.two' ).text(this.title);
  $newImage.find('.three' ).text(this.keyword);

  $('main').append($newImage);
  $('select').append($newOption);
};



Images.getAllimagesFromFile = function(){
  const filePath = './data/page-1.json';
  const fileType = 'json';

  $.get(filePath,fileType).then(myImagesJSON =>{

    myImagesJSON.forEach(image =>{
      new Images(image.image_url, image.title, image.description,image.keyword, image.horns);
    });
    allImages.forEach(image =>{
      image.renderWithJq();
    });
  });
}
Images.getAllimagesFromFile();