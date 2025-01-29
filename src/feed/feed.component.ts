import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatImageService } from '../services/cat-image.service';
import { CatImage } from "../model/cat-image.model";
import { MatDialog } from '@angular/material/dialog';
import {ErrorDialogComponent} from "../app/error-dialog/error-dialog.component";

@Component({
    selector: 'app-feed',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],

})
export class FeedComponent {
    allImages: CatImage[] = [];
    displayedImages: CatImage[] = [];
    itemsToShow = 9;
    itemsPerScroll = 9;
    isLoading = false;
    isDeleteDialogOpen = false;
    imageIdToDelete: string | null = null;
    errorMessage: string = '';



    constructor(
        private catImageService: CatImageService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadAllImages();
    }

    loadAllImages(): void {
        this.isLoading = true;
        this.catImageService.getAllImages().subscribe(
            (response) => {
                console.log('Response received:', response);
                this.allImages = response.data;
                this.displayedImages = this.allImages.slice(0, this.itemsToShow);
                this.isLoading = false;
            },
            (error) => {
                console.error('Error loading images:', error);
                this.isLoading = false;
            }
        );
    }

    onUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
            const file = input.files[0];
            this.isLoading = true;
            const formData = new FormData();
            formData.append('file', file);

            this.catImageService.uploadImage(formData).subscribe(
                (response) => {
                    console.log('Image uploaded successfully:', response);
                    this.loadAllImages(); // Refresh the list of images
                    this.isLoading = false;
                    this.errorMessage = ''; // Clear any previous error messages
                },
                (error) => {
                    console.error('Error uploading image:', error);

                    // Extract backend error message
                    const backendMessage =
                        error.error?.message || 'An unknown error occurred during upload.';

                    this.errorMessage = backendMessage; // Set the error message
                    this.isLoading = false;

                    // Optionally open error dialog
                    this.dialog.open(ErrorDialogComponent, {
                        width: '400px',
                        data: { errorMessage: backendMessage }
                    });
                }
            );
        }
    }



    populateImages(): void {
        this.isLoading = true;
        this.catImageService.populateImages().subscribe(
            (response) => {
                console.log('Images populated:', response);
                this.loadAllImages(); // Refresh the feed
            },
            (error) => {
                console.error('Error populating images:', error);
                this.isLoading = false;
            }
        );
    }

    openDeleteDialog(imageId: string): void {
        this.isDeleteDialogOpen = true;
        this.imageIdToDelete = imageId;
    }

    closeDeleteDialog(): void {
        this.isDeleteDialogOpen = false;
    }

    onDelete(): void {
        if (this.imageIdToDelete) {
            this.isLoading = true;
            this.catImageService.deleteImage(this.imageIdToDelete).subscribe(
                (response) => {
                    console.log('Image deleted:', response);
                    this.loadAllImages(); // Refresh the feed
                    this.isDeleteDialogOpen = false;
                    this.imageIdToDelete = null; // Reset imageIdToDelete
                },
                (error) => {
                    console.error('Error deleting image:', error);
                    this.isLoading = false;
                }
            );
        } else {
            console.error('No image ID to delete');
        }
    }


    onScroll(): void {
        if (this.isLoading) return;

        const nextItems = this.allImages.slice(
            this.displayedImages.length,
            this.displayedImages.length + this.itemsPerScroll
        );

        if (nextItems.length > 0) {
            this.displayedImages = [...this.displayedImages, ...nextItems];
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            !this.isLoading
        ) {
            this.onScroll();
        }
    }
}
