/*
 * Copyright (c) 2024 Tyler Zervas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { LocalDescriptionsSearchApiResponse, LocalPoiSearchApiResponse, OpeningHours } from 'brave-search/dist/types.js';
import type { BraveVideoResult } from './tools/BraveVideoSearchTool.js';

export function formatPoiResults(poiData: LocalPoiSearchApiResponse, poiDesc: LocalDescriptionsSearchApiResponse) {
  return (poiData.results || []).map((poi) => {
    const description = poiDesc.results.find(locationDescription => locationDescription.id === poi.id);
    return `Name: ${poi.title}\n`
      + `${poi.serves_cuisine ? `Cuisine: ${poi.serves_cuisine.join(', ')}\n` : ''}`
      + `Address: ${poi.postal_address.displayAddress}\n`
      + `Phone: ${poi.contact?.telephone || 'No phone number found'}\n`
      + `Email: ${poi.contact?.email || 'No email found'}\n`
      + `Price Range: ${poi.price_range || 'No price range found'}\n`
      + `Ratings: ${poi.rating?.ratingValue || 'N/A'} (${poi.rating?.reviewCount}) reviews\n`
      + `Hours:\n ${(poi.opening_hours) ? formatOpeningHours(poi.opening_hours) : 'No opening hours found'}\n`
      + `Description: ${(description) ? description.description : 'No description found'}\n`;
  }).join('\n---\n');
}

export function formatVideoResults(results: BraveVideoResult[]) {
  return (results || []).map((video) => {
    return `Title: ${video.title}\n`
      + `URL: ${video.url}\n`
      + `Description: ${video.description}\n`
      + `Age: ${video.age}\n`
      + `Duration: ${video.video.duration}\n`
      + `Views: ${video.video.views}\n`
      + `Creator: ${video.video.creator}\n`
      + `${('requires_subscription' in video.video)
        ? (video.video.requires_subscription ? 'Requires subscription\n' : 'No subscription\n')
        : ''} `
        + `${('tags' in video.video && video.video.tags)
          ? (`Tags: ${video.video.tags.join(', ')}`)
          : ''} `
    ;
  }).join('\n---\n');
}

function formatOpeningHours(data: OpeningHours): string {
  const today = data.current_day.map((day) => {
    return `${day.full_name} ${day.opens} - ${day.closes}\n`;
  });
  const weekly = data.days.map((daySlot) => {
    return daySlot.map((day) => {
      return `${day.full_name} ${day.opens} - ${day.closes}`;
    });
  });
  return `Today: ${today}\nWeekly:\n${weekly.join('\n')}`;
}
