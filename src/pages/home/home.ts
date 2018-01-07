import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageList: Array<any> = [];
  public image;

  constructor(private actionSheetCtrl: ActionSheetController, private camera: Camera, private nativeStorage: NativeStorage) {

  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.getPhoto(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Albúm',
          icon: 'images',
          handler: () => {
            this.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cancelar',
          role: 'cancelar',
          icon: 'undo',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }

  getPhoto(local) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: local,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.storeImage('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      alert(err);
    });
  }

  storeImage(image) {

    this.nativeStorage.setItem('image', {image})
      .then(
      () => this.nativeStorage.getItem('image')
            .then(
              data => this.imageList.push(data),
              error => alert(error)
            ),
      error => console.error('Error storing item', error)
    );
  }

}
