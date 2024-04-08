/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the MIT License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       https://www.mit.edu/~amini/LICENSE.md
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Observable } from 'rxjs';
export interface GenerationSettings {
  prompt: string;
  duration: string;
  demandGenAssets: boolean;
}
export interface GenerateVariantsResponse {
  combo_id: number;
  title: string;
  scenes: number[];
  description: string;
}

export interface ApiCalls {
  uploadVideo(file: Blob): Observable<string>;
  getFromGcs(
    url: string,
    mimeType: string,
    retryDelay?: number,
    maxRetries?: number
  ): Observable<string>;
  generateVariants(
    settings: GenerationSettings
  ): Observable<GenerateVariantsResponse[]>;
  getRunsFromGcs(): Observable<string[]>;
}
