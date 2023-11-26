const testData = [
    {
        imgURL: 'https://images.pexels.com/photos/18715721/pexels-photo-18715721/free-photo-of-a-close-up-of-a-green-plant-with-leaves.jpeg',
        title: 'Image of leaves',
        description: 'Image of leaves and nothing else',
        size: 'sm',
        animation: 'transform',
        id: uuid(),
        handleEdit: jest.fn(),
        handleDelete: jest.fn()
    }
]

import '@testing-library/jest-dom'
import {v4 as uuid} from 'uuid'
import { render, waitFor } from "@testing-library/react"
import { GalleryItem } from "../../Components/ImageGallery"

describe('Test cases for GalleryItem', () => {
    testData.map(item => {
        it(`Make sure all the individual data are shown correctly for the image ${item.title}`,async function() {
            const renderer = render(
                <GalleryItem {...item} />
            )
            const titleElement = await waitFor(() => renderer.getByText(item.title))
            const descriptionElement = await waitFor(() =>  renderer.getByText(item.title))
            const imageElement = await waitFor(() => renderer.getByAltText(item.title))
            expect(titleElement).toBeInTheDocument()
            expect(descriptionElement).toBeInTheDocument()
            expect(imageElement).toBeInTheDocument()
            expect(imageElement).toHaveProperty('src', item.imgURL)   
        })
    })
})