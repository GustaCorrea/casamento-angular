import { TestBed } from '@angular/core/testing';
import { AdmGuestsService } from '../../services/admin-guests-service';

describe('AdmGuestsService', () => {
    let service: AdmGuestsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AdmGuestsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
