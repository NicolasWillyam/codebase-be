export class BookingException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingException';
  }
}

export class BookingNotFoundError extends BookingException {
  constructor(id: string) {
    super(`Booking with id ${id} not found`);
    this.name = 'BookingNotFoundError';
  }
}

export class InvalidBookingDatesError extends BookingException {
  constructor() {
    super('Check-out date must be after check-in date');
    this.name = 'InvalidBookingDatesError';
  }
}

export class BookingNotAvailableError extends BookingException {
  constructor(type: 'tour' | 'homestay', id: string) {
    super(`${type} with id ${id} is not available for the selected dates`);
    this.name = 'BookingNotAvailableError';
  }
}

export class InvalidGuestCountError extends BookingException {
  constructor(maxGuests: number) {
    super(`Number of guests exceeds maximum capacity of ${maxGuests}`);
    this.name = 'InvalidGuestCountError';
  }
} 