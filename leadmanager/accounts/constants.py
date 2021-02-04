# this contains all the constants

PATIENT_CHOICES = (
    ('N', 'Normal'),
    ('F', 'Fatal'),
)

DOSE_CHOICES = (
    ('PB1', 'PreBreakfast'),
    ('PB2', 'PostBreakfast'),
    ('PL1', 'PreLunch'),
    ('PL2', 'PostLunch'),
    ('PD1', 'PreDinner'),
    ('PD2', 'PostDinner'),
    ('BT', 'BedTime'),
)

RAPID_INSULIN = (
    ('NR', 'NovoRapid'),
    ('A', 'Apidra'),
    ('HL', 'HumalogLispro'),
    ('R', 'Regular'),
)

LONG_ACTING = (
    ('L', 'Lantus'),
    ('B', 'Basalog'),
    ('Le', 'Levemir'),
    ('G', 'Glaritus'),
    ('D', 'Degludee'),
    ('GG', 'GenericGlargine'),
)
