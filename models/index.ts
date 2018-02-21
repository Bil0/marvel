export interface CharacterDataWrapper {
  code: number; // The HTTP status code of the returned result.
  status: string; // A string description of the call status.
  copyright: string; // The copyright notice for the returned result.
  attributionText: string; // The attribution notice for this result. Please display either this notice or the contents of the attributionHTML field on all screens which contain data from the Marvel Comics API.
  attributionHTML: string; // An HTML representation of the attribution notice for this result. Please display either this notice or the contents of the attributionText field on all screens which contain data from the Marvel Comics API.
  data: CharacterDataContainer; // The results returned by the call.
  etag: string; // A digest value of the content returned by the call.
}

export interface CharacterDataContainer {
  offset: number; // The requested offset (number of skipped results) of the call.
  limit: number; // The requested result limit.
  total: number; // The total number of resources available given the current filter set.
  count: number; // The total number of results returned by this call.
  results: Character[]; // The list of characters returned by the call
}

export interface Character {
  id: number; // The unique ID of the character resource.
  name: string; // The name of the character.
  description: string; // A short bio or description of the character.
  modified: Date; // The date the resource was most recently modified.
  resourceURI: string; // The canonical URL identifier for this resource.
  urls: Url[]; // A set of public web site URLs for the resource.
  thumbnail: Image; // The representative image for this character.
  comics: ComicList; // A resource list containing comics which feature this character.
  stories: StoryList; // A resource list of stories in which this character appears.
  events: EventList; // A resource list of events in which this character appears.
  series: SeriesList; // A resource list of series in which this character appears.
}

export interface Url {
  type: string; // A text identifier for the URL.
  url: string; // A full URL (including scheme, domain, and path)
}

export interface Image {
  path: string; // The directory path of to the image.,
  extension: string; // The file extension for the image.
}

export interface ComicList {
  available: number; // The number of total available issues in this list. Will always be greater than or equal to the "returned" value.
  returned: number; // The number of issues returned in this collection (up to 20).
  collectionURI: string; // The path to the full list of issues in this collection.
  items: ComicSummary[]; // The list of returned issues in this collection.
}

export interface ComicSummary {
  resourceURI: string; // The path to the individual comic resource.
  name: string; // The canonical name of the comic.
}

export interface StoryList {
  available: number; // The number of total available stories in this list. Will always be greater than or equal to the "returned" value.
  returned: number; // The number of stories returned in this collection (up to 20).
  collectionURI: number; // The path to the full list of stories in this collection.
  items: StorySummary[]; // The list of returned stories in this collection.
}

export interface StorySummary {
  resourceURI: string; // The path to the individual story resource.
  name: string; // The canonical name of the story.
  type: string; // The type of the story (interior or cover).
}

export interface EventList {
  available: number; // The number of total available events in this list. Will always be greater than or equal to the "returned" value.
  returned: number; // The number of events returned in this collection (up to 20).
  collectionURI: string; // The path to the full list of events in this collection.
  items: EventSummary[]; // The list of returned events in this collection.
}

export interface EventSummary {
  resourceURI: number; // The path to the individual event resource.
  name: string; // The name of the event.
}

export interface SeriesList {
  available: number; // The number of total available series in this list. Will always be greater than or equal to the "returned" value.
  returned: number; // The number of series returned in this collection (up to 20).
  collectionURI: string; // The path to the full list of series in this collection.
  items: SeriesSummary[]; // The list of returned series in this collection.
}

export interface SeriesSummary {
  resourceURI: string; // The path to the individual series resource.
  name: string; // The canonical name of the series.
}
export interface HeroPreview {
  id: number;
  name: string;
  thumbnail: string;
}

export interface HeroDetails extends HeroPreview {
  description: string;
  comics: string[];
}

export interface APIHost {
  name: string;
  port: number;
}
